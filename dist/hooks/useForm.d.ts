import { FormSchema, ValidationError } from '../types/index.js';
interface UseFormProps<T extends Record<string, any>> {
    schema: FormSchema<T>;
    onSubmit: (data: T) => void;
}
export declare function useForm<T extends Record<string, any>>({ schema, onSubmit, }: UseFormProps<T>): {
    formData: T;
    errors: Partial<Record<keyof T, ValidationError>> | undefined;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    validating: boolean;
};
export {};
