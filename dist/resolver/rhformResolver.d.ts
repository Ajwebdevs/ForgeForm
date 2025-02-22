import type { FormSchema } from "../types/index.js";
import type { Resolver } from "react-hook-form";
export declare const forgeFormResolver: <T extends Record<string, any>>(schema: FormSchema<T>) => Resolver<T>;
