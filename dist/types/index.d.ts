export type FieldType = 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array' | 'enum' | 'union' | 'literal' | 'tuple' | 'record' | 'null' | 'undefined' | 'void' | 'custom' | 'email' | 'password' | 'url' | 'uuid' | 'textarea' | 'tel' | 'select' | 'radio' | 'checkbox' | 'color' | 'integer' | 'float' | 'datetime-local' | 'date-only' | 'time-only' | 'month-only' | 'week-only';
export interface FieldSchema<T = any> {
    type: FieldType;
    required?: boolean;
    default?: T;
    sanitize?: (value: any) => T;
    when?: {
        field: string;
        is?: any | any[];
        schema: FieldSchema<T>;
    };
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
    format?: 'email' | 'url' | 'uuid' | 'alpha' | 'alphanumeric' | 'password' | string;
    formatRegex?: string | RegExp;
    trim?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    min?: number;
    max?: number;
    integer?: boolean;
    float?: boolean;
    positive?: boolean;
    negative?: boolean;
    nonPositive?: boolean;
    nonNegative?: boolean;
    exclusiveMin?: number;
    exclusiveMax?: number;
    precision?: number;
    minDate?: Date | string;
    maxDate?: Date | string;
    past?: boolean;
    future?: boolean;
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    contains?: T;
    elementType?: FieldSchema<T>;
    enum?: T[];
    schema?: FormSchema<any>;
    types?: FieldSchema<T>[];
    unionErrorMessage?: string;
    literal?: T;
    literalErrorMessage?: string;
    tupleSchemas?: FieldSchema<T>[];
    tupleErrorMessage?: string;
    tupleLengthErrorMessage?: string;
    valueSchema?: FieldSchema<T>;
    recordErrorMessage?: string;
    requiredErrorMessage?: string;
    typeErrorMessage?: string;
    minLengthErrorMessage?: string;
    maxLengthErrorMessage?: string;
    patternErrorMessage?: string;
    formatErrorMessage?: string;
    integerErrorMessage?: string;
    floatErrorMessage?: string;
    minErrorMessage?: string;
    maxErrorMessage?: string;
    positiveErrorMessage?: string;
    negativeErrorMessage?: string;
    nonPositiveErrorMessage?: string;
    nonNegativeErrorMessage?: string;
    exclusiveMinErrorMessage?: string;
    exclusiveMaxErrorMessage?: string;
    precisionErrorMessage?: string;
    dateErrorMessage?: string;
    minDateErrorMessage?: string;
    maxDateErrorMessage?: string;
    pastErrorMessage?: string;
    futureErrorMessage?: string;
    minItemsErrorMessage?: string;
    maxItemsErrorMessage?: string;
    uniqueItemsErrorMessage?: string;
    containsErrorMessage?: string;
    schemaErrorMessage?: string;
    enumErrorMessage?: string;
    customValidator?: (value: T, data?: Record<string, any>) => string | undefined;
    asyncValidator?: (value: T, data?: Record<string, any>) => Promise<string | undefined>;
    options?: Array<{
        value: T;
        label: string;
    }>;
    multiple?: boolean;
    rows?: number;
    cols?: number;
    acceptedFileTypes?: string[];
    maxFileSize?: number;
}
export interface FormSchema<T extends Record<string, any> = Record<string, any>> {
    fields: {
        [K in keyof T]: FieldSchema<T[K]>;
    };
}
export type SchemaInput<T extends Record<string, any> = Record<string, any>> = FormSchema<T>;
export interface ValidationError {
    error: string;
    errorCode: string;
    errorType: string;
}
export interface ValidationResult<T extends Record<string, any> = Record<string, any>> {
    success: boolean;
    errors: {
        [K in keyof T]?: ValidationError;
    };
    baseError?: string;
    data?: T;
}
