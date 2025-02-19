import { useState } from 'react';
import { validateData } from '../core/schema.js';
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useForm({ schema, onSubmit, }) {
    if (!schema || !schema.fields) {
        throw new Error("Invalid schema passed to useForm: missing 'fields' property.");
    }
    const initialData = Object.keys(schema.fields).reduce((acc, key) => {
        const field = schema.fields[key];
        if (field.default !== undefined) {
            acc[key] = field.default;
        }
        else {
            switch (field.type) {
                case "boolean":
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    acc[key] = false;
                    break;
                case "number":
                case "integer":
                case "float":
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    acc[key] = 0;
                    break;
                case "array":
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    acc[key] = [];
                    break;
                case "object":
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    acc[key] = {};
                    break;
                default:
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    acc[key] = "";
            }
        }
        return acc;
    }, {});
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [validating, setValidating] = useState(false);
    const handleChange = (e) => {
        const target = e.target;
        const { name, value } = target;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let newValue = value;
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
        }
        else if (target instanceof HTMLSelectElement) {
            if (target.multiple) {
                newValue = Array.from(target.selectedOptions).map((opt) => opt.value);
            }
            else {
                newValue = value;
            }
        }
        else {
            newValue = value;
        }
        if (name.includes(".")) {
            const keys = name.split(".");
            setFormData((prev) => {
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                const updated = { ...prev };
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
        }
        else {
            setFormData((prev) => ({ ...prev, [name]: newValue }));
        }
        setErrors((prev) => {
            if (!prev)
                return prev;
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidating(true);
        const result = await validateData(schema, formData);
        setValidating(false);
        if (result.success) {
            setErrors(undefined);
            onSubmit(result.data);
        }
        else {
            const newErrors = {};
            for (const key in result.errors) {
                if (result.errors[key]) {
                    newErrors[key] = result.errors[key];
                }
            }
            setErrors(newErrors);
        }
    };
    return { formData, errors, handleChange, handleSubmit, validating };
}
