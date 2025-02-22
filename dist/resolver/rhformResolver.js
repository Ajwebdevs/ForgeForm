import { validateData } from "../core/schema.js";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const forgeFormResolver = (schema) => {
    return async (data) => {
        const result = await validateData(schema, data);
        if (result.success) {
            return { values: result.data, errors: {} };
            // biome-ignore lint/style/noUselessElse: <explanation>
        }
        else {
            // Transform errors to React Hook Form format.
            const errors = Object.keys(result.errors || {}).reduce((acc, key) => {
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                acc[key] = { message: result.errors[key].error, type: result.errors[key].errorCode };
                return acc;
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            }, {});
            return { values: {}, errors };
        }
    };
};
