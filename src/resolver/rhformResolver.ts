import type { FormSchema, ValidationResult } from "../types/index.js";
import { validateData } from "../core/schema.js";
import type { Resolver } from "react-hook-form";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const forgeFormResolver = <T extends Record<string, any>>(
  schema: FormSchema<T>
): Resolver<T> => {
  return async (data: T) => {
    const result: ValidationResult<T> = await validateData(schema, data);
    if (result.success) {
      return { values: result.data as T, errors: {} };
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      // Transform errors to React Hook Form format.
      const errors = Object.keys(result.errors || {}).reduce((acc, key) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        acc[key] = { message: (result.errors as any)[key].error, type: (result.errors as any)[key].errorCode };
        return acc;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      }, {} as any);
      return { values: {}, errors };
    }
  };
};
