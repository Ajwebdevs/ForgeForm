import type { FormSchema, ValidationResult as BaseValidationResult } from "../types/index.js";
import type { ValidationError } from "../types/index.js";
export interface ValidationResult<T extends Record<string, any>> extends BaseValidationResult<T> {
    errors: {
        [K in keyof T]?: ValidationError | undefined;
    };
}
export interface WizardStep<T extends Record<string, any>> {
    id: string;
    schema: FormSchema<T>;
}
export interface WizardOptions<T extends Record<string, any>> {
    onStepChange?: (currentStepId: string, currentStepIndex: number, totalSteps: number) => void;
    onValidationSuccess?: (stepId: string, stepIndex: number, result: ValidationResult<T>) => void;
    onValidationError?: (stepId: string, stepIndex: number, result: ValidationResult<T>) => void;
    onComplete?: (finalData: T) => void;
}
export declare class WizardError extends Error {
    originalError?: any | undefined;
    constructor(message: string, originalError?: any | undefined);
}
export declare class WizardValidationError extends WizardError {
    validationResult: ValidationResult<any>;
    constructor(message: string, validationResult: ValidationResult<any>);
}
export declare class SchemaError extends WizardError {
    schemaError?: any | undefined;
    constructor(message: string, schemaError?: any | undefined);
}
export declare class Wizard<T extends Record<string, any>> {
    currentStepIndex: number;
    currentStepId: string;
    totalSteps: number;
    data: Partial<T>;
    stepResults: Array<ValidationResult<T> | null>;
    completedSteps: boolean[];
    private steps;
    private options?;
    private stepIdToIndexMap;
    constructor(steps: Array<WizardStep<T>>, initialData?: Partial<T>, options?: WizardOptions<T>);
    validateCurrentStep(): Promise<ValidationResult<T>>;
    nextStep(stepData: Partial<T>): Promise<boolean>;
    previousStep(): void;
    goToStep(stepId: string): void;
    getProgress(): number;
    getState(): {
        currentStepId: string;
        currentStepIndex: number;
        data: Partial<T>;
        completedSteps: boolean[];
    };
    reset(): void;
    private triggerStepChange;
}
export declare function createWizard<T extends Record<string, any>>(steps: Array<WizardStep<T>>, initialData?: Partial<T>, options?: WizardOptions<T>): Wizard<T>;
