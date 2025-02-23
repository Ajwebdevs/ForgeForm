# ForgeForm

**Lightweight, TypeScript-First Form Validation for Modern Web Applications**

ForgeForm is a powerful and intuitive form validation library built with TypeScript for robust web application development. It simplifies form validation with its declarative schema definition, comprehensive validation engine, React integration for easy form state management, and a rich regex builder.

## 🔗 Links  

- **Live Demo**: [ForgeForm Web Demo](https://forge-form-web-demo.vercel.app/)  
- **GitHub Repository**: [Ajwebdevs/ForgeForm](https://github.com/Ajwebdevs/ForgeForm)  
- **NPM Package**: [ForgeForm on NPM](https://www.npmjs.com/package/forgeform)  

---
![GitHub Repo Stars](https://img.shields.io/github/stars/Ajwebdevs/ForgeForm?style=social)
![NPM Downloads](https://img.shields.io/npm/dt/forgeform)
## ✨ Features  

### 🧙‍♂️ Wizard Forms (New in v1.3.0)  
ForgeForm now includes a powerful **Wizard Forms** feature, enabling multi-step forms with state persistence, validation, and lifecycle hooks.

#### Key Features:
- **Step Identifiers**: Assign unique `id` to each step.
- **Granular Validation**: Validate each step independently.
- **Lifecycle Callbacks**: Handle step changes, validation success, errors, and form completion.
- **Progress Tracking & State Persistence**: Track user progress and restore state if needed.

#### Example Usage:
* (more detailed version below scroll to the wizard section)
```typescript
import { createWizard, createSchema } from 'forgeform';

const steps = [
  {
    id: 'step1',
    schema: createSchema({ name: 'string.required' }),
  },
  {
    id: 'step2',
    schema: createSchema({ email: 'string.email.required' }),
  },
];

const wizard = createWizard(steps);

wizard.nextStep({ name: 'John Doe' })
  .then(() => wizard.nextStep({ email: 'john@example.com' }))
  .then(() => console.log('Wizard completed!'))
  .catch(error => console.error(error));
```

### ✅ Intuitive DSL (Domain Specific Language)  
- Define form schemas effortlessly using `createSchema` with a clean, JSON-like syntax.  
- Supports a wide range of field types: `string`, `number`, `boolean`, `email`, `url`, and more.  
- Handles complex data structures including nested `objects` and `arrays`.  
- Offers advanced type support: `union`, `literal`, `tuple`, and `record` types.  

### ⚡ Robust Core Validation Engine  
- **Type-Safe Validation**: Ensures data adheres to the expected types defined in your schema.  
- **Built-in Sanitization**: Trims whitespace and converts case (lowercase or uppercase) automatically.  
- **Regex/Format Validation**: Leverages over 50 RCN-compliant regex patterns.  
- **Custom Validators**: Supports synchronous and asynchronous validation.  
- **Customizable Error Messages**: Define tailored error messages for better user feedback.  

### 🎯 Seamless Integration with React Hook Form  
ForgeForm seamlessly integrates with React Hook Form for easy form state management.  

#### Example Usage:  
```typescript
import { forgeFormResolver } from 'forgeform';
import { useForm } from 'react-hook-form';
```

### 🏗️ React Form State Management  
- Simplifies form state management within React applications.  
- Manages form data and validation errors seamlessly.  
- Handles nested form fields using dot-notation (e.g., `"address.street"`).  
- Provides real-time validation feedback to users.  

### 🔍 Comprehensive Regex Builder  
- Includes over 50 pre-built, RCN-compliant regex patterns.  
- Supports validation formats such as `email`, `phone`, `url`, `uuid`, `zip`, `ip`, `date`, `time`, `creditCard`, `color`, and more.  
- Allows for custom regex creation using the `buildRegex` function.  

### 🔧 Extensibility & Customization  
- Easily extend or override built-in validators, sanitizers, and regex patterns.  


## 🆕 Changelog  

### [1.3.0] - (Latest)  
- **New Feature:** Introduced **Wizard Forms**, allowing multi-step forms with validation and state persistence.  
- **New Feature:** Added `Wizard` class for creating wizards with step tracking, progress monitoring, and lifecycle callbacks.  

### [1.2.0]  
- **New Feature:** Introduced `forgeFormResolver`, which provides an easy-to-use resolver for **React Hook Form** integration.  


## Installation

Install ForgeForm using npm or yarn:

```bash
npm install forgeform
```
```bash
yarn add forgeform
```

# Wizard Forms in ForgeForm (Beta v1.0.0)

ForgeForm now includes a robust **Wizard Forms** feature that allows you to build multi‑step forms with granular validation, progress tracking, state persistence, and lifecycle hooks. This guide explains how to create and use a wizard, what features it provides, and how to handle errors.

## Overview

The Wizard Forms feature enables you to:
- **Divide your form into multiple steps**, each with its own validation schema.
- **Assign unique identifiers** to each step for non‑linear navigation.
- **Track progress** and maintain a record of which steps are completed.
- **Persist and restore state** for lengthy forms.
- **Receive granular error details** for each step.
- **Leverage lifecycle callbacks** to trigger actions during step changes, validation success, validation errors, and form completion.

## Features

- **Step Identifiers:**  
  Each step is defined with a required unique `id` so you can easily reference and navigate between steps.

- **Granular Validation:**  
  Each step is validated against its own schema. Validation results (including field‑specific errors) are stored in `stepResults`.

- **Lifecycle Callbacks:**  
  - `onStepChange`: Triggered whenever the current step changes.
  - `onValidationSuccess`: Called when a step validates successfully.
  - `onValidationError`: Called when a step fails validation.
  - `onComplete`: Called when the final step validates successfully and the wizard is complete.

- **Progress Tracking & State Persistence:**  
  Use `getProgress()` to obtain the current completion percentage and `getState()` to retrieve the wizard’s current state for saving or restoration.

- **Robust Error Handling:**  
  Custom error classes (`WizardError`, `WizardValidationError`, and `SchemaError`) ensure that errors are descriptive and easily distinguishable.

## Installation

Ensure you have ForgeForm installed:

```bash
npm install forgeform
```

## API Reference

### `createWizard(steps, initialData, options)`

#### Parameters:
- `steps`: An array of wizard steps, where each step is an object with a required `id` and a schema (created using `createSchema()`).
- `initialData` (optional): A partial data object for initializing the form.
- `options` (optional): Lifecycle callback functions.

#### Returns:
An instance of the `Wizard` class.

## Wizard Class Methods

### `validateCurrentStep(): Promise<ValidationResult<T>>`
Validates the current step using its schema and stores field‑specific errors.

### `nextStep(stepData: Partial<T>): Promise<boolean>`
Merges current step data and, if valid, moves to the next step. Returns `true` if the step is validated successfully.

### `previousStep(): void`
Moves back one step.

### `goToStep(stepId: string): void`
Jumps to a specific step using its unique identifier.

### `getProgress(): number`
Returns the current progress percentage (from 0 to 100).

### `getState(): { currentStepId: string; currentStepIndex: number; data: Partial<T>; completedSteps: boolean[] }`
Returns the current state of the wizard, useful for persistence.

### `reset(): void`
Resets the wizard to its initial state.

## Error Handling

- `WizardError` is the base error class for any wizard-related issues.
- `WizardValidationError` is thrown when a step fails validation.
- `SchemaError` is thrown during wizard setup if there are schema issues (e.g., missing or duplicate step IDs).

## Example Code (3 step form)

```typescript
// src/components/SimpleWizardFormDemo.tsx
import React, { useState, useEffect, useMemo } from "react";
import { createSchema, createWizard } from "forgeform"; // Adjust import path as necessary

// 1. Define data type for the simple wizard
interface SimpleWizardData {
    name?: string;
    email?: string;
    message?: string;
}

// 2. Define schemas for each of the 3 steps (simplified)
const step1Schema = createSchema<SimpleWizardData>({
    fields: {
        name: { type: "string", required: true, minLength: 2, requiredErrorMessage: "Name is required" },
    },
});

const step2Schema = createSchema<SimpleWizardData>({
    fields: {
        email: { type: "email", required: true, requiredErrorMessage: "Email is required", formatErrorMessage: "Invalid email" },
    },
});

const step3Schema = createSchema<SimpleWizardData>({
    fields: {
        message: { type: "textarea", required: true, minLength: 10, maxLength: 200, requiredErrorMessage: "Message is required", maxLengthErrorMessage: "Message too long" },
    },
});

// 3. Simple WizardFormDemo Component
const SimpleWizardFormDemo: React.FC = () => {
    // Track current step index in React state
    const [currentStepIndexState, setCurrentStepIndexState] = useState<number>(0);
    // Local state for form data
    const [formData, setFormData] = useState<SimpleWizardData>({});

    // Create wizard instance using useMemo for efficiency
    const wizard = useMemo(() =>
        createWizard<SimpleWizardData>(
            [
                { id: "step-name", schema: step1Schema },
                { id: "step-email", schema: step2Schema },
                { id: "step-message", schema: step3Schema },
            ],
            {}, // Initial data
            {
                onStepChange: (_, index) => setCurrentStepIndexState(index), // Update step index state
                onComplete: (finalData) => console.log("Simple Wizard Completed:", finalData), // Log final data
            }
        ), []
    );

    // Generic input change handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Next step handler
    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await wizard.nextStep(formData);
        if (success) {
            setFormData({}); // Clear form data after step
        } else {
            alert("Validation errors. Please check the form.");
        }
    };

    // Previous step handler
    const handlePrevious = (e: React.FormEvent) => {
        e.preventDefault();
        wizard.previousStep();
    };

    // Submit handler for final step
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await wizard.nextStep(formData);
        if (success) {
            alert("Simple Wizard Completed! Check console for data.");
            setFormData({});
            wizard.reset();
            setCurrentStepIndexState(0); // Reset to first step
        } else {
            alert("Validation errors on final step.");
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h3>Simple 3-Step Wizard Demo</h3>
            <p>Step {currentStepIndexState + 1} of 3</p>
            <form onSubmit={currentStepIndexState === 2 ? handleSubmit : handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>

                {currentStepIndexState === 0 && (
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleInputChange} style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
                    </div>
                )}

                {currentStepIndexState === 1 && (
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleInputChange} style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
                    </div>
                )}

                {currentStepIndexState === 2 && (
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" value={formData.message || ''} onChange={handleInputChange} style={{ width: '100%', padding: '8px', margin: '5px 0', minHeight: '100px' }} />
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    {currentStepIndexState > 0 && (
                        <button type="button" onClick={handlePrevious} style={{ padding: '10px 15px' }}>Previous</button>
                    )}
                    <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                        {currentStepIndexState === 2 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SimpleWizardFormDemo;
```




## Usage (General Hooks and Resolver)

*   **1. Defining a Schema with the DSL Parser**
    *   Designed for extensibility, allowing you to easily extend or override built-in validators, sanitizers, and regex patterns to match your application's specific requirements.

```typescript
import { createSchema } from 'forgeform';

interface FormData {
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
}

const schema = createSchema<FormData>({
  fields: {
    email: {
      type: 'email',
      required: true,
      minLength: 5,
      trim: true,
      lowercase: true,
      requiredErrorMessage: "Email is required.",
    },
    age: {
      type: 'number',
      required: true,
      min: 18,
      max: 120,
    },
    password: {
      type: 'password',
      required: true,
      minLength: 8,
    },
    confirmPassword: {
      type: 'custom',
      required: true,
      customValidator: (value, data) =>
        value === data?.password ? undefined : "Passwords do not match.",
    },
    address: {
      type: 'object',
      required: true,
      schema: {
        fields: {
          street: {
            type: 'string',
            required: true,
            trim: true,
          },
          city: {
            type: 'string',
            required: true,
            trim: true,
          },
          zip: {
            type: 'string',
            required: true,
            // Uses the built-in ZIP regex pattern via regex builder.
            pattern: require('forgeform/regexBuilder').buildRegex({ type: 'zip' }).source,
            patternErrorMessage: "Invalid ZIP code format.",
          },
        },
      },
    },
  },
});
```

*   **2.Using the React Hook (useForm) in your Component**
    *   Integrate your schema into your React form component using the useForm hook. This hook manages form state, handles input changes, performs validation, and provides error feedback.

```typescript
// demo/src/App.tsx
import React from 'react';
import { createSchema, useForm } from 'forgeform';

interface FormData {
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
}

const schema = createSchema<FormData>({ /* ... schema definition from above ... */ }); // Reusing the schema definition from step 1

const App: React.FC = () => {
  const { formData, errors, handleChange, handleSubmit, validating } = useForm<FormData>({
    schema,
    onSubmit: (data) => {
      console.log("Submitted Data:", data);
      alert("Form submitted! Check console for data.");
    },
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>ForgeForm Demo</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} style={styles.input} />
          {errors?.email && <span style={styles.error}>{errors.email.error}</span>}
        </div>
        <div style={styles.field}>
          <label htmlFor="age" style={styles.label}>Age:</label>
          <input id="age" name="age" type="number" value={formData.age || ""} onChange={handleChange} style={styles.input} />
          {errors?.age && <span style={styles.error}>{errors.age.error}</span>}
        </div>
        <div style={styles.field}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} style={styles.input} />
          {errors?.password && <span style={styles.error}>{errors.password.error}</span>}
        </div>
        <div style={styles.field}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} style={styles.input} />
          {errors?.confirmPassword && <span style={styles.error}>{errors.confirmPassword.error}</span>}
        </div>
        <div style={styles.field}>
          <h2 style={{ marginBottom: "0.5rem" }}>Address</h2>
          <label htmlFor="address.street" style={styles.label}>Street:</label>
          <input id="address.street" name="address.street" type="text" value={formData.address?.street || ""} onChange={handleChange} style={styles.input} />
          <label htmlFor="address.city" style={styles.label}>City:</label>
          <input id="address.city" name="address.city" type="text" value={formData.address?.city || ""} onChange={handleChange} style={styles.input} />
          <label htmlFor="address.zip" style={styles.label}>ZIP Code:</label>
          <input id="address.zip" name="address.zip" type="text" value={formData.address?.zip || ""} onChange={handleChange} style={styles.input} />
          {errors?.address && <span style={styles.error}>{errors.address.error}</span>}
        </div>
        <button type="submit" disabled={validating} style={styles.button}>
          {validating ? "Validating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = { /* ... (styling code from provided example) ... */ };

export default App;
```

*   **3.Using the React Hook Form `Adapter/Resolver`**
    *   ForgeForm also provides a custom resolver for React Hook Form. This lets you integrate ForgeForm with React Hook Form effortlessly:


```typescript
// following is the demo for the react-hook-forms with submission 

import React from "react";
import { useForm as useRHFForm } from "react-hook-form";
import { createSchema, forgeFormResolver, buildRegex } from "forgeform";

interface FormData {
  email: string;
  age: number;
}

const schema = createSchema<FormData>({
  fields: {
    email: {
      type: "email",
      required: true,
      minLength: 5,
      trim: true,
      lowercase: true,
      // Updated email regex requires at least one dot in the domain:
      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.source,
      requiredErrorMessage: "Email is required.",
    },
    age: {
      type: "number",
      required: true,
      min: 18,
      max: 120,
    },
  },
});

const RHFExample: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRHFForm<FormData>({
    resolver: forgeFormResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        ForgeForm with React Hook Form
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit, (errs) => console.log("Validation Errors:", errs))}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" {...register("email")} style={{ padding: "0.5rem", width: "100%" }} />
          {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" {...register("age", { valueAsNumber: true })} style={{ padding: "0.5rem", width: "100%" }} />
          {errors.age && <span style={{ color: "red" }}>{errors.age.message}</span>}
        </div>
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RHFExample;
```

### Complex Validation
The demo form showcases complex validation rules:

- **Email Field**: Validates for email format, requires a minimum length, and applies sanitization (trimming and lowercasing).
- **Password Fields**: `confirmPassword` uses a custom validator to ensure it matches the password field.
- **Age Field**: Restricts input to numbers between 18 and 120.
- **ZIP Code Field**: Utilizes the built-in zip regex pattern from the regex builder for format validation.
- **Over 100+ Regex vals**: Discover over 100 pre-built out of the box regex soloution to be directly used wihtin the formSchema

### Built-In Sanitization
Sanitization rules defined in the schema (trim, lowercase) are automatically applied by the core validation engine before validation occurs.

**Intelligent Type Coercion in `applySanitizers`**

To address this, ForgeForm's `applySanitizers` function has been updated with enhanced logic to automatically coerce string inputs into the data types defined in your schema. This ensures that validation and subsequent data handling are performed on correctly typed data, even when the initial input is a string.

The enhanced `applySanitizers` function now includes the following type coercion capabilities:

*   **Numeric Types (`number`, `integer`, `float`):**
    If a field is defined as a numeric type and receives a string value, ForgeForm will attempt to parse the string into a number using `Number()`.
    -   If the string can be successfully parsed into a number, the sanitized value will be the parsed number.
    -   If the string cannot be parsed into a valid number (e.g., "abc"), ForgeForm will issue a warning to the console and use the field's `default` value if specified in the schema. If no default is provided, the value will be set to `undefined`.

*   **Boolean Types (`boolean`, `checkbox`):**
    For boolean fields receiving string inputs, ForgeForm will intelligently interpret common string representations of boolean values:
    -   Strings `"true"` or `"on"` (case-insensitive) will be coerced to `true`.
    -   Strings `"false"` or `"off"` (case-insensitive) will be coerced to `false`.
    -   If the string does not match these boolean representations, a console warning will be issued, and the field's `default` value will be used if provided in the schema. Otherwise, the value will be set to `undefined`.
    -   If the input value is not a string but also not already a boolean, it will be coerced to a boolean using `!!value` (double negation for truthiness).

*   **Date Types (`date`, `datetime-local`, `date-only`, `time-only`, `month-only`, `week-only`):**
    When a field is defined as a date type and receives a string, ForgeForm will attempt to parse the string into a Date object.
    -   It first tries parsing the string as an ISO date using `parseISO` from `date-fns`.
    -   If ISO parsing fails, it falls back to standard JavaScript `Date` constructor parsing (`new Date(sanitizedValue)`).
    -   If either parsing method results in a valid Date object, the sanitized value will be the Date object.
    -   If date parsing fails, a console warning will be logged, and the field's `default` value will be used if defined in the schema. If no default is specified, the value becomes `undefined`.

### Error Display
Validation errors, if any, are displayed inline below their respective input fields, providing immediate feedback to the user.

### Styling
Basic inline styles are used to create a clean and functional form layout. You can easily replace these with your preferred CSS styling approach.

## Schema Field Options
Here's a detailed explanation of the options available within the `FieldSchema` to define validation rules and field behaviors:

### Type: `FieldType` (Required)
Defines the data type of the field. Allowed `FieldType` values are:

- `'string'`: For text input.
- `'number'`: For numeric input.
- `'boolean'`: For boolean values (e.g., checkboxes, switches).
- `'date'`: For date input (YYYY-MM-DD).
- `'object'`: For nested object structures.
- `'array'`: For arrays of data.
- `'enum'`: For selecting from a predefined list of values.
- `'union'`: For fields that can accept values of multiple types.
- `'literal'`: For fields that must match a specific literal value.
- `'tuple'`: For fixed-length arrays with specific types for each element.
- `'record'`: For key-value pairs where keys are strings and values have a consistent type.
- `'null'`: Allows null values.
- `'undefined'`: Allows undefined values.
- `'void'`: Represents the absence of a value.
- `'custom'`: For fields validated by a `customValidator` or `asyncValidator`.
- `'email'`: String type with built-in email format validation.
- `'password'`: String type, often used for password fields (can be combined with other validators like `minLength`, `pattern`).
- `'url'`: String type with built-in URL format validation.
- `'uuid'`: String type with built-in UUID format validation.
- `'textarea'`: For multi-line text input.
- `'tel'`: For telephone number input.
- `'select'`: For dropdown selection.
- `'radio'`: For radio button selection.
- `'checkbox'`: For checkbox input.
- `'color'`: For color picker input (validated as hex or rgb color).
- `'integer'`: Number type, validated to be an integer.
- `'float'`: Number type, validated to be a floating-point number.
- `'datetime-local'`: For date and time input (local timezone).
- `'date-only'`: For date input only.
- `'time-only'`: For time input only.
- `'month-only'`: For month input only (YYYY-MM).
- `'week-only'`: For week input only (YYYY-Www).

### Required Field
```bash
required?: boolean # Marks the field as mandatory. If true, validation will fail if the field is empty or not provided. Default is false.
```

### Sanitization
```bash
sanitize?: (value: any) => T # A function to sanitize the input value before validation.
```

### String Validators
```bash
minLength?: number # Minimum length for string values.
maxLength?: number # Maximum length for string values.
pattern?: string | RegExp # Regex pattern to validate string format.
format?: 'email' | 'url' | 'uuid' | 'alpha' | 'alphanumeric' | 'password' | string # Uses pre-defined or custom regex formats for validation.
trim?: boolean # If true, trims whitespace.
lowercase?: boolean # Converts to lowercase.
uppercase?: boolean # Converts to uppercase.
```

### Number Validators
```bash
min?: number # Minimum allowed numeric value.
max?: number # Maximum allowed numeric value.
integer?: boolean # Ensures value is an integer.
float?: boolean # Ensures value is a floating-point number.
positive?: boolean # Ensures value is positive.
negative?: boolean # Ensures value is negative.
precision?: number # Limits number of decimal places.
```

### Date Validators
```bash
minDate?: Date | string # Ensures the date is not before the specified date.
maxDate?: Date | string # Ensures the date is not after the specified date.
past?: boolean # Ensures the date is in the past.
future?: boolean # Ensures the date is in the future.
```

### Array Validators
```bash
minItems?: number # Minimum number of items in an array.
maxItems?: number # Maximum number of items in an array.
uniqueItems?: boolean # Ensures all items in the array are unique.
contains?: T # Ensures array contains a specific element.
```

## Out-of-the-Box Regex Validators and Use Cases

ForgeForm provides a rich set of pre-built regex validators to streamline your form validation process.  You can leverage these validators by using the `format` option within your `FieldSchema`. Simply specify `format: '<validatorName>'` to apply the corresponding regex.

Here's a table summarizing the available validators and their common use cases:


### Common Data Formats

| Validator Name | Description                                          | Use Cases                                                                 |
| :--------------- | :--------------------------------------------------- | :-------------------------------------------------------------------------- |
| `email`          | Validates email addresses (RFC 5322 compliant).    | Email registration forms, contact forms, profile updates.                 |
| `phone`          | Validates phone numbers (international format).      | Phone number fields in user profiles, contact information.                |
| `url`            | Validates URLs (HTTP, HTTPS, FTP).                 | Website fields, profile URLs, links in content.                              |
| `uuid`           | Validates UUIDs (versions 1-5).                    | Unique identifiers, API keys, database record IDs.                         |
| `zip`            | Validates US ZIP codes (5 or 9 digits) & Indian ZIP codes (6 digits). | Address forms for US and Indian users, shipping address validation.                   |
| `indianZipCode6Digit` | Validates Indian ZIP codes (strict 6 digits).      | Forms specifically requiring 6-digit Indian ZIP codes.                     |
| `indianZipCode6DigitFlexible` | Validates Indian ZIP codes (6 digits, allows spaces/hyphens). | More flexible input for Indian ZIP codes, accommodating common separators.      |
| `ip`             | Validates IPv4 addresses.                           | Server address inputs, network configurations.                             |
| `date`           | Validates dates in YYYY-MM-DD format.             | Date of birth, event dates, booking dates.                                  |
| `time`           | Validates times in HH:MM or HH:MM:SS format.      | Appointment times, scheduling forms.                                       |
| `creditCard`     | Validates common credit card number formats.        | Payment forms (use with caution, consider PCI compliance for real transactions). |
| `hexColor`       | Validates hexadecimal color codes.                 | Color picker inputs, theme customization forms.                            |
| `rgb`            | Validates `rgb(r, g, b)` color format.             | Color settings, visual customization.                                      |
| `aadhar`         | Validates Indian Aadhar card numbers (12 digits).  | Forms requiring Indian national ID verification (within India, respecting privacy regulations). |
| `panCard`        | Validates Indian PAN card numbers.                 | Financial forms, Indian tax compliance forms.                             |
| `indianDrivingLicense`| Validates Indian driving license numbers (basic format). | Indian address verification, KYC forms.                             |
| `gstNumber`      | Validates Indian GST numbers.                       | Indian business forms, tax related forms.                                  |
| `indianPassport`   | Validates Indian passport numbers (basic format).    | Indian identity verification, travel related forms.                        |


### String Patterns

| Validator Name    | Description                                      | Use Cases                                                     |
| :----------------- | :----------------------------------------------- | :-------------------------------------------------------------- |
| `alphanumeric`    | Only letters and numbers.                          | Usernames, IDs, codes.                                         |
| `alpha`           | Only letters.                                    | Names, locations (where only alphabetic input is expected).      |
| `decimal`         | Decimal numbers (optional sign, decimal point).   | Price inputs, measurements, quantities.                          |
| `base64`          | Base64 encoded strings.                            | Data encoding validation, API data inputs.                       |
| `lowercase`       | Only lowercase letters.                             | Enforcing lowercase input for specific fields.                  |
| `uppercase`       | Only uppercase letters.                             | Enforcing uppercase input like initials or acronyms.            |
| `strongPassword`  | Strong password criteria (length, case, numbers, special chars). | Password creation/reset forms for security.                     |
| `mediumPassword`  | Medium password criteria (length, case, numbers).   | Password suggestions with moderate security.                     |
| `weakPassword`    | Weak password criteria (minimum length only).       | Less critical password fields, or for testing purposes only.   |
| `username`        | Usernames (alphanumeric, underscore, hyphen).     | Account creation, profile usernames.                             |
| `hashtag`         | Hashtags (starts with #, alphanumeric, underscore). | Social media content input, tagging features.                    |
| `creditCardExpiry`| Credit card expiry date (MM/YY or MM/YYYY).        | Payment forms.                                                  |
| `cvv`             | CVV/CVC codes (3 or 4 digits).                     | Payment forms.                                                  |
| `ssn`             | US Social Security Numbers (basic format).         | Sensitive data forms (use with extreme caution and security best practices). |
| `canadianPostalCode` | Canadian postal codes.                         | Address forms for Canadian users.                              |
| `ukPostcode`      | UK postcodes.                                     | Address forms for UK users.                                   |
| `ipAddress`       | IPv4 or IPv6 addresses.                            | Network configuration, server settings.                           |
| `macAddress`      | MAC addresses.                                     | Network device identification, hardware settings.               |
| `jwt`             | JSON Web Tokens (basic structure).                | API authentication, token validation (structural).              |
| `semver`          | Semantic Versioning strings.                      | Software version input, package management forms.                 |
| `vin`             | Vehicle Identification Number (VIN).              | Vehicle registration forms, automotive data input.              |
| `usCurrency`      | US currency format.                               | Financial applications, e-commerce platforms.                   |
| `signedPercentage`| Percentages with optional +/- sign.               | Financial reports, performance metrics.                         |
| `visaCard`        | Visa credit card numbers.                           | Payment forms, specific card type validation.                  |
| `masterCard`      | MasterCard credit card numbers.                     | Payment forms, specific card type validation.                  |
| `amexCard`        | American Express credit card numbers.               | Payment forms, specific card type validation.                  |
| `discoverCard`    | Discover credit card numbers.                       | Payment forms, specific card type validation.                  |
| `dinersClubCard`  | Diners Club credit card numbers.                    | Payment forms, specific card type validation.                  |
| `jcbCard`         | JCB credit card numbers.                            | Payment forms, specific card type validation.                  |
| `genericPhoneNumber`| Generic phone numbers with extensions.            | Flexible phone number input fields.                             |
| `ssnFlexible`     | US Social Security Numbers (flexible formats).    | More lenient SSN input, data cleaning.                          |
| `usPhoneNumber`   | US phone numbers with area code format.           | US-specific phone number fields.                                |
| `time12h`         | Time in 12-hour format (with AM/PM).              | User-friendly time input, appointment scheduling.                |
| `simpleURL`       | Simple URLs without protocol (domain.tld).         | Quick URL input, less strict URL validation.                   |
| `youtubeURL`      | YouTube video URLs.                                 | Embedding videos, content curation.                             |
| `vimeoURL`        | Vimeo video URLs.                                  | Embedding videos, content curation.                             |
| `dateSlashMDY`    | Dates in MM/DD/YYYY format.                         | US-style date input.                                            |
| `dateDotDMY`      | Dates in DD.MM.YYYY format.                         | European-style date input.                                      |
| `timeFlexibleMilliseconds` | Time with milliseconds (flexible).         | Time logging, detailed time input.                             |
| `versionNumber`   | Flexible version numbers.                           | Software version management, application settings.              |
| `orderId`         | Order ID format (example).                          | E-commerce, order tracking systems.                             |
| `productCode`     | Product code format (example).                      | Inventory systems, product databases.                           |
| `trackingNumber`  | Tracking number format (generic).                   | Shipping and logistics forms.                                   |
| `invoiceNumber`   | Invoice number format (example).                    | Accounting, billing systems.                                     |
| `eventId`         | Event ID format (example).                           | Event management systems, ticketing.                             |
| `jobId`           | Job ID format (example).                             | Task management, job tracking applications.                     |
| `serialNumber`    | Serial number format (example).                      | Equipment tracking, warranty systems.                           |
| `modelNumber`     | Model number format (example).                       | Product catalogs, technical specifications.                       |
| `sku`             | SKU (Stock Keeping Unit) format (example).         | Inventory management, retail systems.                           |
| `assetTag`        | Asset tag format (example).                          | Asset tracking, inventory management.                           |
| `receiptNumber`   | Receipt number format (example).                     | Point of sale systems, transaction records.                     |
| `confirmationNumber`| Confirmation number format (example).              | Booking systems, registration confirmations.                    |
| `bookingReference`| Booking reference format (example).                | Travel booking, appointment systems.                            |
| `ticketNumber`    | Ticket number format (example).                      | Support systems, event ticketing.                                |
| `referenceCode`   | Generic reference code format.                       | General purpose identification codes.                           |
| `voucherCode`     | Voucher code format (example).                       | Marketing promotions, discount systems.                         |
| `couponCode`      | Coupon code format (example).                        | E-commerce discounts, promotional offers.                        |
| `promotionCode`   | Promotion code format (example).                     | Marketing campaigns, promotional discounts.                     |
| `discountCode`    | Discount code format (example).                      | E-commerce, sales applications.                                  |
| `accessCode`      | Generic access code format.                          | Security access, authentication systems.                         |
| `pinCode`         | PIN code format (generic 4-8 digits).               | Security verification, access control.                            |
| `otpCode`         | OTP (One-Time Password) format (generic 6 digits).  | Two-factor authentication, secure transactions.                 |
| `verificationCode`| Verification code format (generic 6-8 alphanumeric). | Account verification, security processes.                       |
| `accountNumber`   | Account number format (generic).                     | Financial applications, banking systems.                         |
| `iban`            | IBAN (International Bank Account Number).           | International banking, financial transactions.                   |
| `swiftCode`       | SWIFT/BIC code.                                    | International banking, банковские transfers.                   |
| `taxId`           | Tax ID format (generic).                             | Financial forms, tax compliance.                                  |
| `registrationNumber`| Registration number format (generic).              | Business registration, legal documents.                           |
| `membershipId`    | Membership ID format (generic).                      | Membership management systems, loyalty programs.                 |
| `referenceNumber` | Reference number format (generic).                   | General purpose tracking and identification.                    |
| `applicationId`   | Application ID format (generic).                     | Application tracking, system logs.                              |
| `confirmationCode`| Confirmation code format (generic).              | Transaction confirmations, system responses.                    |
| `authorizationCode`| Authorization code format (generic).              | Payment processing, security authorizations.                    |
| `transactionId`   | Transaction ID format (generic).                     | E-commerce, financial transaction tracking.                     |
| `paymentReference`| Payment reference format (generic).                 | Billing systems, payment tracking.                              |
| `bookingNumber`   | Booking number format (generic).                     | Reservation systems, appointment booking.                       |
| `enrollmentKey`   | Enrollment key format (generic).                     | System enrollment, device provisioning.                           |
| `activationCode`  | Activation code format (generic).                    | Software activation, product licensing.                           |
| `unlockCode`      | Unlock code format (generic).                        | Device unlocking, access recovery.                                |
| `accessKey`       | Access key format (generic).                         | API access, secure system entry.                                 |
| `secretKey`       | Secret key format (generic).                         | API keys, security credentials.                                  |


### Number Patterns

| Validator Name        | Description                                | Use Cases                                                     |
| :--------------------- | :----------------------------------------- | :-------------------------------------------------------------- |
| `integer`             | Whole numbers (no decimals).                 | Age, quantity, counts, whole number inputs.                     |
| `positiveInteger`     | Positive integers (greater than zero).       | Order quantities, counts (where zero is invalid).              |
| `negativeInteger`     | Negative integers (less than zero).          | Representing debts, negative balances (less common in forms).  |
| `nonNegativeInteger`  | Zero or positive integers.                  | Counts, quantities (allowing zero).                             |
| `nonPositiveInteger`  | Zero or negative integers.                  | (Less common use case, possibly for specific financial inputs). |
| `float`               | Floating-point numbers (with decimals).      | Prices, measurements with decimal precision.                    |
| `positiveFloat`       | Positive floating-point numbers.             | Positive measurements, amounts.                                 |
| `negativeFloat`       | Negative floating-point numbers.             | (Less common use case, could be for financial losses/negative changes). |
| `percentage`          | Percentages (0-100%).                         | Discount rates, progress indicators.                            |
| `port`                | Port numbers (0-65535).                       | Network settings, server configurations.                       |
| `year`                | Years in YYYY format.                          | Year selection in date pickers, historical data input.          |
| `month`               | Months in MM format (01-12).                 | Month selection, date parts input.                              |
| `day`                 | Days in DD format (01-31).                   | Day selection, date parts input.                                |
| `hour`                | Hours in HH format (00-23).                  | Time selection, scheduling.                                     |
| `minute`              | Minutes in MM format (00-59).                | Time selection, duration input.                                |
| `second`              | Seconds in SS format (00-59).                | Precise time input, durations.                                 |

### Text/String Content Patterns

| Validator Name      | Description                                            | Use Cases                                                              |
| :------------------- | :----------------------------------------------------- | :----------------------------------------------------------------------- |
| `words`             | Letters, spaces, hyphens, apostrophes (for words).     | Name fields, descriptions, text inputs where sentences are expected. |
| `sentence`          | Basic sentence structure (starts uppercase, ends with punctuation). | Paragraphs, descriptions that should resemble sentences.               |
| `paragraph`         | Multiple sentences.                                      | Long text descriptions, articles, comment sections.                   |
| `creditCardNumber`  | Credit card numbers (digits, spaces, hyphens).        | Payment forms (again, PCI compliance for real transactions is crucial). |
| `alphaSpace`        | Letters and spaces only.                                | Full name input (if only letters and spaces are allowed).             |
| `alphanumericSpace` | Letters, numbers, and spaces.                           | Addresses, descriptions that can contain numbers and letters.          |
| `filename`          | Filenames (alphanumeric, underscore, hyphen, period).   | File upload forms, document naming conventions.                        |
| `fileExtension`     | File extensions (alphanumeric, 2-4 chars).            | File type validation in upload forms.                                  |

### Location/Geographic Patterns

| Validator Name   | Description                                    | Use Cases                                            |
| :---------------- | :--------------------------------------------- | :--------------------------------------------------- |
| `latitude`       | Latitude coordinates (-90 to +90 degrees).    | Location data input, mapping applications.           |
| `longitude`      | Longitude coordinates (-180 to +180 degrees). | Location data input, mapping applications.           |
| `postalCode`     | Generic alphanumeric postal codes.             | Address forms (for countries not specifically covered). |
| `countryCode`    | 2-letter uppercase ISO country codes.        | Country selection, address forms.                     |
| `currencySymbol` | Common currency symbols ($, €, £, ¥, ₹).         | Currency input, financial forms, now includes Indian Rupee.                        |

### Social Media/Online Patterns

| Validator Name      | Description                                               | Use Cases                                                       |
| :------------------- | :-------------------------------------------------------- | :---------------------------------------------------------------- |
| `twitterHandle`     | Twitter handles (starts with @, alphanumeric, underscores). | Social media profile links, user mentions.                         |
| `instagramUsername` | Instagram usernames (alphanumeric, underscore, period).     | Social media profile links.                                     |
| `githubUsername`    | GitHub usernames (alphanumeric and hyphen).               | Developer profiles, project links.                                 |
| `domainName`        | Basic domain names.                                         | Website input, URL validation (for basic domain format).          |

### Semantic/Contextual Patterns

| Validator Name         | Description                                        | Use Cases                                                       |
| :---------------------- | :------------------------------------------------- | :----------------------------------------------------------------- |
| `ean13`              | EAN-13 barcodes (13 digits).                        | Product forms, inventory management (EAN-13 codes).             |
| `isbn10`             | ISBN-10 numbers (with or without hyphens).           | Book information forms, library systems.                          |
| `isbn13`             | ISBN-13 numbers (with or without hyphens).           | Book information forms, library systems.                          |
| `timezoneOffset`       | Timezone offsets (e.g., +02:00, -05:30, Z).           | Scheduling applications, international time settings.             |
| `mimeType`           | Basic MIME types (type/subtype).                     | File upload forms, content type validation.                       |
| `languageCode`       | ISO 639-1 2-letter language codes.                   | Language selection in forms, localization settings.               |
| `countryLanguageCode` | Combined country and language codes (e.g., en-US).     | Localization settings, regional preferences.                    |

### Empty/Whitespace Patterns

| Validator Name           | Description                                    | Use Cases                                               |
| :------------------------ | :--------------------------------------------- | :-------------------------------------------------------- |
| `notEmpty`               | Non-empty strings (at least one non-whitespace char). | Ensuring required text fields are not just whitespace.    |
| `whitespace`             | Strings containing only whitespace.              | Detecting empty fields (can be used to check if a field *is* whitespace). |
| `guid`                   | GUIDs (Globally Unique Identifiers).           | Unique IDs, system identifiers.                           |
| `socialSecurityNumber`   | US Social Security Numbers (flexible format).   | Sensitive data (use with extreme caution and security).   |
| `yearMonth`              | Year-Month format (YYYY-MM).                   | Date ranges, reporting periods.                             |
| `monthDay`               | Month-Day format (MM-DD).                     | Recurring events, date templates.                           |
| `timeMilliseconds`       | Time with milliseconds (HH:MM:SS.mmm).         | Precise time logging, performance measurements.             |


**Remember**: While these regex validators are helpful, always consider the specific requirements of your application and user base. You may need to adjust or extend these patterns for optimal validation. You can also create completely custom regex patterns and use them with ForgeForm.