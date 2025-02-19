import type { FormSchema } from '../types/index.js';
import type { ValidationResult } from '../types/index.js';
export declare function validateData<T extends Record<string, any>>(schema: FormSchema<T>, data: Record<string, any>): Promise<ValidationResult<T>>;
export declare function parse<T extends Record<string, any>>(schema: FormSchema<T>, data: Record<string, any>): Promise<T>;
export declare function safeParse<T extends Record<string, any>>(schema: FormSchema<T>, data: Record<string, any>): Promise<ValidationResult<T>>;
