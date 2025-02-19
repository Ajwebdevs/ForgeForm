import { useState } from 'react';
// biome-ignore lint/style/useImportType: <explanation>
import { FieldSchema, FormSchema, ValidationError } from '../types/index.js';
import { validateData } from '../core/schema.js';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
interface UseFormProps<T extends Record<string, any>> {
  schema: FormSchema<T>;
  onSubmit: (data: T) => void;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useForm<T extends Record<string, any>>({
  schema,
  onSubmit,
}: UseFormProps<T>) {
  if (!schema || !schema.fields) {
    throw new Error("Invalid schema passed to useForm: missing 'fields' property.");
  }

  const initialData = Object.keys(schema.fields).reduce((acc, key) => {
    const field: FieldSchema = schema.fields[key];
    if (field.default !== undefined) {
      acc[key as keyof T] = field.default;
    } else {
      switch (field.type) {
        case "boolean":
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          acc[key as keyof T] = false as any;
          break;
        case "number":
        case "integer":
        case "float":
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          acc[key as keyof T] = 0 as any;
          break;
        case "array":
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          acc[key as keyof T] = [] as any;
          break;
        case "object":
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          acc[key as keyof T] = {} as any;
          break;
        default:
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          acc[key as keyof T] = "" as any;
      }
    }
    return acc;
  }, {} as T);

  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, ValidationError>> | undefined>({});
  const [validating, setValidating] = useState<boolean>(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value } = target;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let newValue: any = value;
  
    if (target instanceof HTMLInputElement) {
      switch (target.type) {
        case "checkbox":
          newValue = target.checked;
          break;
        case "number":
          newValue = value === "" ? "" : Number.parseFloat(value);
          break;
        case "file":
          newValue = target.files ? Array.from(target.files) : null;
          break;
        default:
          newValue = value;
      }
    } else if (target instanceof HTMLSelectElement) {
      if (target.multiple) {
        newValue = Array.from(target.selectedOptions).map((opt) => opt.value);
      } else {
        newValue = value;
      }
    } else {
      newValue = value;
    }
  
    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const updated = { ...prev } as any;
        let current = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = newValue;
        return updated;
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    }
  
    setErrors((prev) => {
      if (!prev) return prev;
      const newErrors = { ...prev };
      delete newErrors[name as keyof typeof prev];
      return newErrors;
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidating(true);
    const result = await validateData(schema, formData);
    setValidating(false);
    if (result.success) {
      setErrors(undefined);
      onSubmit(result.data as T);
    } else {
      const newErrors: Partial<Record<keyof T, ValidationError>> = {};
      for (const key in result.errors) {
        if (result.errors[key]) {
          newErrors[key] = result.errors[key] as ValidationError;
        }
      }
      setErrors(newErrors);
    }
  };

  return { formData, errors, handleChange, handleSubmit, validating };
}
