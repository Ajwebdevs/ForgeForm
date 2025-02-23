import { validateData } from "./schema.js";
export class WizardError extends Error {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    constructor(message, originalError) {
        super(message);
        this.originalError = originalError;
        this.name = "WizardError";
        if (originalError instanceof Error) {
            this.stack = originalError.stack; // Preserve original stack if available.
        }
    }
}
export class WizardValidationError extends WizardError {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    constructor(message, validationResult) {
        super(message);
        this.validationResult = validationResult;
        this.name = "WizardValidationError";
    }
}
export class SchemaError extends WizardError {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    constructor(message, schemaError) {
        super(message);
        this.schemaError = schemaError;
        this.name = "SchemaError";
    }
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class Wizard {
    constructor(steps, initialData = {}, options) {
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
    async validateCurrentStep() {
        var _a, _b, _c, _d;
        try {
            const currentStepSchema = this.steps[this.currentStepIndex].schema;
            const result = await validateData(currentStepSchema, this.data);
            if (!result) {
                throw new WizardError(`Validation function did not return a valid ValidationResult for step '${this.currentStepId}'.`);
            }
            this.stepResults[this.currentStepIndex] = result;
            if (result.success) {
                this.completedSteps[this.currentStepIndex] = true;
                (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.onValidationSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, this.currentStepId, this.currentStepIndex, result);
            }
            else {
                this.completedSteps[this.currentStepIndex] = false;
                (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.onValidationError) === null || _d === void 0 ? void 0 : _d.call(_c, this.currentStepId, this.currentStepIndex, result);
                throw new WizardValidationError(`Validation failed for step '${this.currentStepId}'.`, result);
            }
            return result;
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        }
        catch (error) {
            if (error instanceof WizardValidationError || error instanceof SchemaError) {
                throw error;
            }
            throw new WizardError(`Error validating step '${this.currentStepId}': ${error instanceof Error ? error.message : String(error)}`, error);
        }
    }
    async nextStep(stepData) {
        var _a, _b;
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
                }
                else {
                    (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.onComplete) === null || _b === void 0 ? void 0 : _b.call(_a, this.data);
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            if (error instanceof WizardValidationError) {
                return false;
            }
            throw error;
        }
    }
    previousStep() {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
            this.currentStepId = this.steps[this.currentStepIndex].id;
            this.triggerStepChange();
        }
    }
    goToStep(stepId) {
        const stepIndex = this.stepIdToIndexMap.get(stepId);
        if (stepIndex !== undefined) {
            this.currentStepIndex = stepIndex;
            this.currentStepId = stepId;
            this.triggerStepChange();
        }
        else {
            console.warn(`[Wizard]: goToStep - Step with id '${stepId}' not found.`);
        }
    }
    getProgress() {
        return Math.round(((this.currentStepIndex + 1) / this.totalSteps) * 100);
    }
    getState() {
        return {
            currentStepId: this.currentStepId,
            currentStepIndex: this.currentStepIndex,
            data: this.data,
            completedSteps: this.completedSteps,
        };
    }
    reset() {
        this.currentStepIndex = 0;
        this.currentStepId = this.steps[0].id;
        this.data = {};
        this.stepResults.fill(null);
        this.completedSteps.fill(false);
        this.triggerStepChange();
    }
    triggerStepChange() {
        var _a, _b;
        (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.onStepChange) === null || _b === void 0 ? void 0 : _b.call(_a, this.currentStepId, this.currentStepIndex, this.totalSteps);
    }
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function createWizard(steps, initialData = {}, options) {
    return new Wizard(steps, initialData, options);
}
