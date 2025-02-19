import Ajv from "ajv";
const ajv = new Ajv.default();
/*Creates a FormSchema from a JSON Schema input And Validates the JSON Schema and transforms it into the internal FormSchema representation.*/
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function createSchema(input) {
    var _a;
    if (input && Object.prototype.hasOwnProperty.call(input, "fields")) {
        return input;
    }
    const validateSchema = ajv.compile({});
    const isValidSchema = validateSchema(input);
    if (!isValidSchema) {
        const errors = ((_a = validateSchema.errors) === null || _a === void 0 ? void 0 : _a.map((err) => `${err.keyword} error at ${err.instancePath}: ${err.message}`).join(', ')) || 'Schema validation failed';
        throw new Error(`Invalid JSON Schema provided: ${errors}`);
    }
    try {
        const formSchema = parseJsonSchema(input);
        if (!("fields" in formSchema)) {
            throw new Error("Parsed schema does not contain a 'fields' property.");
        }
        return formSchema;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    }
    catch (error) {
        throw new Error(`Error parsing JSON Schema: ${error instanceof Error ? error.message : String(error)}`);
    }
}
/*Recursively parses a JSON Schema object and transforms it into a FormSchema or FieldSchema.*/
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function parseJsonSchema(jsonSchema) {
    if (jsonSchema.properties) {
        // It's an object schema.
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const fields = {};
        for (const propertyName in jsonSchema.properties) {
            if (Object.prototype.hasOwnProperty.call(jsonSchema.properties, propertyName)) {
                const propertySchema = jsonSchema.properties[propertyName];
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                fields[propertyName] = parseJsonSchema(propertySchema);
            }
        }
        return { fields };
    }
    // It's a FieldSchema.
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const fieldSchema = {
        type: mapJsonSchemaTypeToFieldType(jsonSchema.type),
        required: jsonSchema.required === true,
        default: jsonSchema.default,
        minLength: jsonSchema.minLength,
        maxLength: jsonSchema.maxLength,
        pattern: jsonSchema.pattern,
        format: mapJsonSchemaFormatToFieldFormat(jsonSchema.format),
        formatRegex: jsonSchema.formatRegex,
        min: jsonSchema.minimum,
        max: jsonSchema.maximum,
        exclusiveMin: jsonSchema.exclusiveMinimum,
        exclusiveMax: jsonSchema.exclusiveMaximum,
        precision: jsonSchema.precision,
        minItems: jsonSchema.minItems,
        maxItems: jsonSchema.maxItems,
        uniqueItems: jsonSchema.uniqueItems,
        enum: jsonSchema.enum,
    };
    if (jsonSchema.const !== undefined) {
        fieldSchema.type = "literal";
        fieldSchema.literal = jsonSchema.const;
    }
    if (jsonSchema.enum) {
        fieldSchema.type = "enum";
        fieldSchema.enum = jsonSchema.enum;
    }
    if (jsonSchema.oneOf || jsonSchema.anyOf) {
        fieldSchema.type = "union";
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        fieldSchema.types = (jsonSchema.oneOf || jsonSchema.anyOf).map(parseJsonSchema);
    }
    if (jsonSchema.type === "array" && jsonSchema.items) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        fieldSchema.elementType = parseJsonSchema(jsonSchema.items);
    }
    if (jsonSchema.type === "object" && jsonSchema.properties) {
        fieldSchema.type = "object";
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        fieldSchema.schema = parseJsonSchema(jsonSchema);
    }
    return fieldSchema;
}
function mapJsonSchemaTypeToFieldType(jsonSchemaType) {
    let resolvedType = jsonSchemaType;
    if (Array.isArray(jsonSchemaType)) {
        resolvedType = jsonSchemaType[0];
    }
    switch (resolvedType) {
        case "string":
            return "string";
        case "number":
            return "number";
        case "integer":
            return "integer";
        case "boolean":
            return "boolean";
        case "null":
            return "null";
        case "array":
            return "array";
        case "object":
            return "object";
        default:
            return "custom";
    }
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function mapJsonSchemaFormatToFieldFormat(jsonSchemaFormat) {
    switch (jsonSchemaFormat) {
        case "email":
            return "email";
        case "url":
            return "url";
        case "uuid":
            return "uuid";
        case "date-time":
        case "date":
        case "time":
            return "date";
        case "password":
            return "password";
        default:
            return jsonSchemaFormat;
    }
}
