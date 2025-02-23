import type { FormSchema, ValidationResult as BaseValidationResult } from "../types/index.js";
import { validateData } from "./schema.js";
import type { ValidationError } from "../types/index.js";


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  interface ValidationResult<T extends Record<string, any>> extends BaseValidationResult<T> {
  errors: {
    [K in keyof T]?: ValidationError | undefined;
  };
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  interface WizardStep<T extends Record<string, any>> {
  id: string; // Step identifier is now required.
  schema: FormSchema<T>;
}



// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  interface WizardOptions<T extends Record<string, any>> {
  onStepChange?: (currentStepId: string, currentStepIndex: number, totalSteps: number) => void;
  onValidationSuccess?: (stepId: string, stepIndex: number, result: ValidationResult<T>) => void;
  onValidationError?: (stepId: string, stepIndex: number, result: ValidationResult<T>) => void;
  onComplete?: (finalData: T) => void;
}


export class WizardError extends Error {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = "WizardError";
    if (originalError instanceof Error) {
      this.stack = originalError.stack; // Preserve original stack if available.
    }
  }
}


export class WizardValidationError extends WizardError {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  constructor(message: string, public validationResult: ValidationResult<any>) {
    super(message);
    this.name = "WizardValidationError";
  }
}


export class SchemaError extends WizardError {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  constructor(message: string, public schemaError?: any) {
    super(message);
    this.name = "SchemaError";
  }
}


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  class Wizard<T extends Record<string, any>> {
  public currentStepIndex: number;
  public currentStepId: string;
  public totalSteps: number;
  public data: Partial<T>;
  public stepResults: Array<ValidationResult<T> | null>;
  public completedSteps: boolean[];
  private steps: Array<WizardStep<T>>;
  private options?: WizardOptions<T>;
  private stepIdToIndexMap: Map<string, number>;

  constructor(steps: Array<WizardStep<T>>, initialData: Partial<T> = {}, options?: WizardOptions<T>) {
    if (!steps || steps.length === 0) {
      throw new SchemaError("Wizard must be initialized with at least one step schema.", steps);
    }
    this.steps = steps;
    this.totalSteps = steps.length;
    this.currentStepIndex = 0;
    this.currentStepId = steps[0].id;
    this.data = { ...initialData };
    this.stepResults = new Array(this.totalSteps).fill(null);
    this.completedSteps = new Array(this.totalSteps).fill(false);
    this.options = options;
    this.stepIdToIndexMap = new Map();
    this.steps.forEach((step, index) => {
      if (!step.id) {
        throw new SchemaError(`Step at index ${index} is missing a required 'id' property.`, step);
      }
      if (this.stepIdToIndexMap.has(step.id)) {
        throw new SchemaError(`Duplicate step id '${step.id}' found. Step IDs must be unique.`, step);
      }
      this.stepIdToIndexMap.set(step.id, index);
    });
    this.triggerStepChange();
  }


  public async validateCurrentStep(): Promise<ValidationResult<T>> {
    try {
      const currentStepSchema = this.steps[this.currentStepIndex].schema;
      const result = await validateData(currentStepSchema, this.data) as ValidationResult<T>;
      if (!result) {
        throw new WizardError(`Validation function did not return a valid ValidationResult for step '${this.currentStepId}'.`);
      }
      this.stepResults[this.currentStepIndex] = result;
      if (result.success) {
        this.completedSteps[this.currentStepIndex] = true;
        this.options?.onValidationSuccess?.(this.currentStepId, this.currentStepIndex, result);
      } else {
        this.completedSteps[this.currentStepIndex] = false;
        this.options?.onValidationError?.(this.currentStepId, this.currentStepIndex, result);
        throw new WizardValidationError(`Validation failed for step '${this.currentStepId}'.`, result);
      }
      return result;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      if (error instanceof WizardValidationError || error instanceof SchemaError) {
        throw error;
      }
      throw new WizardError(`Error validating step '${this.currentStepId}': ${error instanceof Error ? error.message : String(error)}`, error);
    }
  }

  public async nextStep(stepData: Partial<T>): Promise<boolean> {
    this.data = { ...this.data, ...stepData };
    try {
      const result = await this.validateCurrentStep();
      if (result.success) {
        if (this.currentStepIndex < this.totalSteps - 1) {
          this.currentStepIndex++;
          this.currentStepId = this.steps[this.currentStepIndex].id;
          this.triggerStepChange();
          return true;
        // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          this.options?.onComplete?.(this.data as T);
          return true;
        }
      }
      return false;
    } catch (error) {
      if (error instanceof WizardValidationError) {
        return false;
      }
      throw error;
    }
  }


  public previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.currentStepId = this.steps[this.currentStepIndex].id;
      this.triggerStepChange();
    }
  }


  public goToStep(stepId: string): void {
    const stepIndex = this.stepIdToIndexMap.get(stepId);
    if (stepIndex !== undefined) {
      this.currentStepIndex = stepIndex;
      this.currentStepId = stepId;
      this.triggerStepChange();
    } else {
      console.warn(`[Wizard]: goToStep - Step with id '${stepId}' not found.`);
    }
  }


  public getProgress(): number {
    return Math.round(((this.currentStepIndex + 1) / this.totalSteps) * 100);
  }


  public getState(): { currentStepId: string; currentStepIndex: number; data: Partial<T>; completedSteps: boolean[] } {
    return {
      currentStepId: this.currentStepId,
      currentStepIndex: this.currentStepIndex,
      data: this.data,
      completedSteps: this.completedSteps,
    };
  }


  public reset(): void {
    this.currentStepIndex = 0;
    this.currentStepId = this.steps[0].id;
    this.data = {};
    this.stepResults.fill(null);
    this.completedSteps.fill(false);
    this.triggerStepChange();
  }


  private triggerStepChange(): void {
    this.options?.onStepChange?.(this.currentStepId, this.currentStepIndex, this.totalSteps);
  }
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  function createWizard<T extends Record<string, any>>(
  steps: Array<WizardStep<T>>,
  initialData: Partial<T> = {},
  options?: WizardOptions<T>
): Wizard<T> {
  return new Wizard(steps, initialData, options);
}
