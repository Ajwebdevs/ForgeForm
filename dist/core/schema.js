/* Apply built‑in sanitizers for string values. */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function applySanitizers(fieldSchema, value) {
    let sanitizedValue = value;
    if (typeof sanitizedValue === 'string') {
        if (fieldSchema.trim) {
            sanitizedValue = sanitizedValue.trim();
        }
        if (fieldSchema.lowercase) {
            sanitizedValue = sanitizedValue.toLowerCase();
        }
        if (fieldSchema.uppercase) {
            sanitizedValue = sanitizedValue.toUpperCase();
        }
    }
    if (fieldSchema.sanitize) {
        sanitizedValue = fieldSchema.sanitize(sanitizedValue);
    }
    return sanitizedValue;
}
/* If a field defines a conditional "when" clause, merge in its alternate schema if the condition is met. */
function validateConditional(fieldSchema, 
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
data) {
    if (fieldSchema.when) {
        const dependentValue = data[fieldSchema.when.field];
        const condition = fieldSchema.when.is;
        const conditionMet = Array.isArray(condition)
            ? condition.includes(dependentValue)
            : dependentValue === condition;
        if (conditionMet) {
            return { ...fieldSchema, ...fieldSchema.when.schema };
        }
    }
    return fieldSchema;
}
/* Validates a single field using its schema. */
async function validateField(fieldName, origFieldSchema, 
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
value, 
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
data) {
    var _a;
    const fieldSchema = validateConditional(origFieldSchema, data);
    const validatedValue = applySanitizers(fieldSchema, value);
    data[fieldName] = validatedValue;
    // Required check
    if (fieldSchema.required && (validatedValue === undefined || validatedValue === null || validatedValue === '')) {
        return {
            error: fieldSchema.requiredErrorMessage || `${fieldName} is required.`,
            errorCode: 'required',
            errorType: 'validation',
        };
    }
    if (!fieldSchema.required && (validatedValue === undefined || validatedValue === null || validatedValue === '')) {
        return {};
    }
    switch (fieldSchema.type) {
        // --- String-like types ---
        case 'string':
        case 'email':
        case 'password':
        case 'url':
        case 'uuid':
        case 'textarea':
        case 'tel':
        case 'select':
        case 'radio':
        case 'checkbox':
        case 'color': {
            if (typeof validatedValue !== 'string') {
                return {
                    error: fieldSchema.typeErrorMessage || `${fieldName} must be a string.`,
                    errorCode: 'type',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.minLength && validatedValue.length < fieldSchema.minLength) {
                return {
                    error: fieldSchema.minLengthErrorMessage ||
                        `${fieldName} must be at least ${fieldSchema.minLength} characters long.`,
                    errorCode: 'minLength',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.maxLength && validatedValue.length > fieldSchema.maxLength) {
                return {
                    error: fieldSchema.maxLengthErrorMessage ||
                        `${fieldName} must be at most ${fieldSchema.maxLength} characters long.`,
                    errorCode: 'maxLength',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.pattern) {
                const regex = typeof fieldSchema.pattern === 'string'
                    ? new RegExp(fieldSchema.pattern)
                    : fieldSchema.pattern;
                if (!regex.test(validatedValue)) {
                    return {
                        error: fieldSchema.patternErrorMessage || `${fieldName} is invalid.`,
                        errorCode: 'pattern',
                        errorType: 'validation',
                    };
                }
            }
            if (fieldSchema.format) {
                let regex;
                let formatName = fieldSchema.format;
                const customRegex = fieldSchema.formatRegex; // check's the custom regex , alternativly add RCN regex support --todo later
                if (customRegex) {
                    regex = typeof customRegex === 'string' ? new RegExp(customRegex) : customRegex;
                }
                else {
                    switch (fieldSchema.format) {
                        case 'email':
                            // RFC 5322 Official Standard
                            regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                            break;
                        case 'url':
                            // URL regex (RCN‑compliant)
                            regex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/\S*)?$/i;
                            break;
                        case 'uuid':
                            regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                            break;
                        case 'alpha':
                            regex = /^[A-Za-z]+$/;
                            break;
                        case 'alphanumeric':
                            regex = /^[A-Za-z0-9]+$/;
                            break;
                        case 'password':
                            regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                            break;
                        default:
                            if (typeof fieldSchema.format === 'string') {
                                regex = new RegExp(fieldSchema.format);
                                formatName = fieldSchema.format;
                            }
                            break;
                    }
                }
                if (regex && !regex.test(validatedValue)) {
                    return {
                        error: fieldSchema.formatErrorMessage ||
                            `${fieldName} must match the format ${formatName}.`,
                        errorCode: 'format',
                        errorType: 'validation',
                    };
                }
            }
            break;
        }
        // --- Number types ---
        case 'number':
        case 'integer':
        case 'float': {
            if (typeof validatedValue !== 'number') {
                return {
                    error: fieldSchema.typeErrorMessage || `${fieldName} must be a number.`,
                    errorCode: 'type',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.integer && !Number.isInteger(validatedValue)) {
                return {
                    error: fieldSchema.integerErrorMessage || `${fieldName} must be an integer.`,
                    errorCode: 'integer',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.float && !Number.isFinite(validatedValue)) {
                return {
                    error: fieldSchema.floatErrorMessage || `${fieldName} must be a float.`,
                    errorCode: 'float',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.min !== undefined && validatedValue < fieldSchema.min) {
                return {
                    error: fieldSchema.minErrorMessage || `${fieldName} must be at least ${fieldSchema.min}.`,
                    errorCode: 'min',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.max !== undefined && validatedValue > fieldSchema.max) {
                return {
                    error: fieldSchema.maxErrorMessage || `${fieldName} must be at most ${fieldSchema.max}.`,
                    errorCode: 'max',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.positive && validatedValue <= 0) {
                return {
                    error: fieldSchema.positiveErrorMessage || `${fieldName} must be positive.`,
                    errorCode: 'positive',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.negative && validatedValue >= 0) {
                return {
                    error: fieldSchema.negativeErrorMessage || `${fieldName} must be negative.`,
                    errorCode: 'negative',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.nonPositive && validatedValue > 0) {
                return {
                    error: fieldSchema.nonPositiveErrorMessage || `${fieldName} must be non-positive.`,
                    errorCode: 'nonPositive',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.nonNegative && validatedValue < 0) {
                return {
                    error: fieldSchema.nonNegativeErrorMessage || `${fieldName} must be non-negative.`,
                    errorCode: 'nonNegative',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.exclusiveMin !== undefined && validatedValue <= fieldSchema.exclusiveMin) {
                return {
                    error: fieldSchema.exclusiveMinErrorMessage ||
                        `${fieldName} must be greater than ${fieldSchema.exclusiveMin}.`,
                    errorCode: 'exclusiveMin',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.exclusiveMax !== undefined && validatedValue >= fieldSchema.exclusiveMax) {
                return {
                    error: fieldSchema.exclusiveMaxErrorMessage ||
                        `${fieldName} must be less than ${fieldSchema.exclusiveMax}.`,
                    errorCode: 'exclusiveMax',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.precision !== undefined) {
                const factor = 10 ** fieldSchema.precision;
                if (Math.round(validatedValue * factor) / factor !== validatedValue) {
                    return {
                        error: fieldSchema.precisionErrorMessage ||
                            `${fieldName} must have at most ${fieldSchema.precision} decimal places.`,
                        errorCode: 'precision',
                        errorType: 'validation',
                    };
                }
            }
            break;
        }
        // --- Boolean ---
        case 'boolean': {
            if (typeof validatedValue !== 'boolean') {
                return {
                    error: fieldSchema.typeErrorMessage || `${fieldName} must be a boolean.`,
                    errorCode: 'type',
                    errorType: 'validation',
                };
            }
            break;
        }
        // --- Date / Time ---
        case 'date':
        case 'datetime-local':
        case 'date-only':
        case 'time-only':
        case 'month-only':
        case 'week-only': {
            const dateValue = new Date(validatedValue);
            if (Number.isNaN(dateValue.getTime())) {
                return {
                    error: fieldSchema.dateErrorMessage || `${fieldName} must be a valid date.`,
                    errorCode: 'date',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.minDate && dateValue < new Date(fieldSchema.minDate)) {
                return {
                    error: fieldSchema.minDateErrorMessage || `${fieldName} must be after ${fieldSchema.minDate}.`,
                    errorCode: 'minDate',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.maxDate && dateValue > new Date(fieldSchema.maxDate)) {
                return {
                    error: fieldSchema.maxDateErrorMessage || `${fieldName} must be before ${fieldSchema.maxDate}.`,
                    errorCode: 'maxDate',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.past && dateValue >= new Date()) {
                return {
                    error: fieldSchema.pastErrorMessage || `${fieldName} must be in the past.`,
                    errorCode: 'past',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.future && dateValue <= new Date()) {
                return {
                    error: fieldSchema.futureErrorMessage || `${fieldName} must be in the future.`,
                    errorCode: 'future',
                    errorType: 'validation',
                };
            }
            break;
        }
        // --- Object---
        case 'object': {
            if (typeof validatedValue !== 'object' || Array.isArray(validatedValue)) {
                return {
                    error: fieldSchema.typeErrorMessage || `${fieldName} must be an object.`,
                    errorCode: 'type',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.schema) {
                const nestedResult = await validateData(fieldSchema.schema, validatedValue);
                if (!nestedResult.success) {
                    return {
                        error: fieldSchema.schemaErrorMessage || `${fieldName} has invalid nested data.`,
                        errorCode: 'schema',
                        errorType: 'validation',
                    };
                }
            }
            break;
        }
        // --- Array ---
        case 'array': {
            if (!Array.isArray(validatedValue)) {
                return {
                    error: fieldSchema.typeErrorMessage || `${fieldName} must be an array.`,
                    errorCode: 'type',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.minItems && validatedValue.length < fieldSchema.minItems) {
                return {
                    error: fieldSchema.minItemsErrorMessage ||
                        `${fieldName} must have at least ${fieldSchema.minItems} items.`,
                    errorCode: 'minItems',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.maxItems && validatedValue.length > fieldSchema.maxItems) {
                return {
                    error: fieldSchema.maxItemsErrorMessage ||
                        `${fieldName} must have at most ${fieldSchema.maxItems} items.`,
                    errorCode: 'maxItems',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.uniqueItems && new Set(validatedValue).size !== validatedValue.length) {
                return {
                    error: fieldSchema.uniqueItemsErrorMessage ||
                        `${fieldName} must have unique items.`,
                    errorCode: 'uniqueItems',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.contains !== undefined && !validatedValue.includes(fieldSchema.contains)) {
                return {
                    error: fieldSchema.containsErrorMessage ||
                        `${fieldName} must contain ${fieldSchema.contains}.`,
                    errorCode: 'contains',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.elementType) {
                for (let i = 0; i < validatedValue.length; i++) {
                    const errResult = await validateField(`${fieldName}[${i}]`, fieldSchema.elementType, validatedValue[i], data);
                    if (errResult.error)
                        return errResult;
                }
            }
            break;
        }
        // --- Enum ---
        case 'enum': {
            if (!fieldSchema.enum || !fieldSchema.enum.includes(validatedValue)) {
                return {
                    error: fieldSchema.enumErrorMessage ||
                        `${fieldName} must be one of ${(_a = fieldSchema.enum) === null || _a === void 0 ? void 0 : _a.join(', ')}.`,
                    errorCode: 'enum',
                    errorType: 'validation',
                };
            }
            break;
        }
        // --- Union ---
        case 'union': {
            if (!fieldSchema.types) {
                console.warn(`Union type validation for ${fieldName} is missing 'types' definition in schema.`);
                return {}; // No error, but warn in console as schema is misconfigured
            }
            let isValidUnion = false;
            for (const unionSchema of fieldSchema.types) {
                const result = await validateField(fieldName, unionSchema, validatedValue, data);
                if (!result.error) {
                    isValidUnion = true;
                    break;
                }
            }
            if (!isValidUnion) {
                return {
                    error: fieldSchema.unionErrorMessage ||
                        `${fieldName} does not match any of the allowed union types.`,
                    errorCode: 'union',
                    errorType: 'validation',
                };
            }
            break;
        }
        // --- Literal ---
        case 'literal': {
            if (validatedValue !== fieldSchema.literal) {
                return {
                    error: fieldSchema.literalErrorMessage ||
                        `${fieldName} must be literal value: ${fieldSchema.literal}.`,
                    errorCode: 'literal',
                    errorType: 'validation',
                };
            }
            break;
        }
        // --- Tuple ---
        case 'tuple': {
            if (!Array.isArray(validatedValue)) {
                return {
                    error: fieldSchema.tupleErrorMessage || `${fieldName} must be a tuple (array).`,
                    errorCode: 'tupleType',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.tupleSchemas && validatedValue.length !== fieldSchema.tupleSchemas.length) {
                return {
                    error: fieldSchema.tupleLengthErrorMessage ||
                        `${fieldName} must have exactly ${fieldSchema.tupleSchemas.length} items.`,
                    errorCode: 'tupleLength',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.tupleSchemas) {
                for (let i = 0; i < fieldSchema.tupleSchemas.length; i++) {
                    const elementSchema = fieldSchema.tupleSchemas[i];
                    const elementValue = validatedValue[i];
                    const elementResult = await validateField(`${fieldName}[${i}]`, elementSchema, elementValue, data);
                    if (elementResult.error)
                        return elementResult;
                }
            }
            break;
        }
        // --- Record ---
        case 'record': {
            if (typeof validatedValue !== 'object' || Array.isArray(validatedValue)) {
                return {
                    error: fieldSchema.recordErrorMessage || `${fieldName} must be a record (object).`,
                    errorCode: 'recordType',
                    errorType: 'validation',
                };
            }
            if (fieldSchema.valueSchema) {
                for (const key in validatedValue) {
                    if (Object.prototype.hasOwnProperty.call(validatedValue, key)) {
                        const recordValue = validatedValue[key];
                        const recordResult = await validateField(`${fieldName}.${key}`, fieldSchema.valueSchema, recordValue, data);
                        if (recordResult.error)
                            return recordResult;
                    }
                }
            }
            break;
        }
        // --- Custom Type / Any / Undef ---
        default:
            // Rely on custom validators if provided
            break;
    }
    // Custom synchronous validator
    if (fieldSchema.customValidator) {
        const customError = fieldSchema.customValidator(validatedValue, data);
        if (customError)
            return { error: customError, errorCode: 'custom', errorType: 'customValidation' };
    }
    // Custom asynchronous validator
    if (fieldSchema.asyncValidator) {
        const asyncError = await fieldSchema.asyncValidator(validatedValue, data);
        if (asyncError)
            return { error: asyncError, errorCode: 'asyncCustom', errorType: 'asyncValidation' };
    }
    return {}; // No error
}
/* Validates an entire form schema against the provided data */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function validateData(schema, 
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
data) {
    const errors = {};
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const validatedData = { ...data };
    for (const fieldName in schema.fields) {
        if (Object.prototype.hasOwnProperty.call(schema.fields, fieldName)) {
            const fieldSchema = schema.fields[fieldName];
            let value = data[fieldName];
            // Set def if not provided --tdl (priority low)
            if ((value === undefined || value === null || value === '') && fieldSchema.default !== undefined) {
                value = fieldSchema.default;
                validatedData[fieldName] = value;
            }
            const errorResult = await validateField(fieldName, fieldSchema, value, validatedData);
            if (errorResult.error) {
                errors[fieldName] = errorResult;
            }
        }
    }
    // ERROR MITIGATION -- TO DO LATER
    const success = Object.keys(errors).length === 0;
    return {
        success,
        errors: errors,
        data: success ? validatedData : undefined,
    };
}
/* parse() will throw an error if validation fails */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function parse(schema, 
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
data) {
    const result = await validateData(schema, data);
    if (!result.success) {
        throw new Error(JSON.stringify(result.errors));
    }
    return result.data;
}
/* safeParse() returns an object with success and errors */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function safeParse(schema, 
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
data) {
    return await validateData(schema, data);
}
