export interface RegexOptions {
    type: string;
    pattern?: string;
}

export const regexValidators: { [key: string]: RegExp } = {
    // --- Common Data Formats ---
    // Email: RFC 5322 Official Standard 
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    // Phone: Allows an optional '+' followed by digits, spaces, dashes and parentheses 
    phone: /^[+]?[\d\s\-()]+$/,
    // URL: Supports http, https, ftp with optional www. 
    url: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/\S*)?$/i,
    // UUID: Matches standard UUID (version 1-5) formats 
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    // US ZIP Code: 5 digits, optional extension (e.g. 12345 or 12345-6789) 
    zip: /^\d{5}(?:[-\s]\d{4})?$/,
    // IPv4: Basic IPv4 address validation 
    ip: /^(25[0-5]|2[0-4]\d|[01]?\d\d?)(\.(25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/,
    // Date: YYYY-MM-DD format 
    date: /^\d{4}-\d{2}-\d{2}$/,
    // Time: HH:MM or HH:MM:SS format 
    time: /^\d{2}:\d{2}(:\d{2})?$/,
    // Credit Card: Simple pattern covering Visa, MasterCard, AmEx, Discover 
    creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/,
    // Hex Color: Matches 3 or 6 hexadecimal digits (with optional '#') 
    hexColor: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    // RGB Color: Matches rgb(255, 255, 255) with spaces allowed 
    rgb: /^rgb\(\s*(0|[1-9]\d{0,2})\s*,\s*(0|[1-9]\d{0,2})\s*,\s*(0|[1-9]\d{0,2})\s*\)$/,

    // --- String Patterns ---
    // Alphanumeric: Only letters and numbers 
    alphanumeric: /^[A-Za-z0-9]+$/,
    // Alphabetic: Only letters 
    alpha: /^[A-Za-z]+$/,
    // Decimal: Supports optional sign, decimals, and no thousands separator 
    decimal: /^[+-]?(\d*\.)?\d+$/,
    // Base64: Matches a valid Base64 encoded string 
    base64: /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/,
    // Lowercase: Only lowercase letters
    lowercase: /^[a-z]+$/,
    // Uppercase: Only uppercase letters
    uppercase: /^[A-Z]+$/,
    // Password (strong): At least 8 chars, uppercase, lowercase, number, special char (as before, but named 'strongPassword')
    strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    // Password (medium): At least 6 chars, lowercase, number
    mediumPassword: /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    // Password (weak):  At least 4 chars, any characters
    weakPassword: /^.{4,}$/,
    // Username: Alphanumeric, underscore, hyphen, 3-20 chars
    username: /^[a-zA-Z0-9_\-]{3,20}$/,
    // Hashtag:  Starts with #, followed by alphanumeric and underscores
    hashtag: /^#[a-zA-Z0-9_]+$/,
    // Credit Card Expiry Date (MM/YY or MM/YYYY)
    creditCardExpiry: /^(0[1-9]|1[0-2])\/([0-9]{2}|[0-9]{4})$/,
    // CVV/CVC: 3 or 4 digits
    cvv: /^\d{3,4}$/,
    // Social Security Number (US - basic format)
    ssn: /^\d{3}-\d{2}-\d{4}$/,
    // Canadian Postal Code
    canadianPostalCode: /^[A-Za-z]\d[A-Za-z][\s]?\d[A-Za-z]\d$/,
    // UK Postcode
    ukPostcode: /^([Gg][Ii][Rr]0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/,
    // IP Address (v4 or v6)
    ipAddress: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))|(([0-9A-Fa-f]{1,4}:){4}((((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4}:)((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))))|(([0-9A-Fa-f]{1,4}:){3}(((((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))))|(([0-9A-Fa-f]{1,4}:){2}(((((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))))|(([0-9A-Fa-f]{1,4}:){1}(((((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))))|:(((((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))))(%.+)?s*$/,
    // MAC Address
    macAddress: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
    // JWT (JSON Web Token) - basic structure validation
    jwt: /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
    // SemVer (Semantic Versioning)
    semver: /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,

    // --- Number Patterns ---
    // Integer (whole number, no decimals)
    integer: /^-?\d+$/,
    // Positive Integer (greater than zero, no decimals)
    positiveInteger: /^[1-9]\d*$/,
    // Negative Integer (less than zero, no decimals)
    negativeInteger: /^-\d+$/,
    // Non-negative Integer (zero or positive, no decimals)
    nonNegativeInteger: /^(0|[1-9]\d*)$/,
    // Non-positive Integer (zero or negative, no decimals)
    nonPositiveInteger: /^-(0|[1-9]\d*)?$/,
    // Float (number with decimal)
    float: /^-?\d*\.\d+$/,
    // Positive Float (greater than zero, with decimal)
    positiveFloat: /^[1-9]\d*\.\d+$/,
    // Negative Float (less than zero, with decimal)
    negativeFloat: /^-\d*\.\d+$/,
    // Percentage (0-100%)
    percentage: /^(100(\.0{0,2})?|[0-9]{1,2}(\.[0-9]{0,2})?)%?$/,
    // Port Number (0-65535)
    port: /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
    // Year (YYYY format)
    year: /^\d{4}$/,
    // Month (MM format, 01-12)
    month: /^(0[1-9]|1[0-2])$/,
    // Day (DD format, 01-31)
    day: /^(0[1-9]|[12]\d|3[01])$/,
    // Hour (HH format, 00-23)
    hour: /^(0\d|1\d|2[0-3])$/,
    // Minute (MM format, 00-59)
    minute: /^[0-5]\d$/,
    // Second (SS format, 00-59)
    second: /^[0-5]\d$/,

    // --- Text/String Content Patterns ---
    // Words only (letters, spaces, hyphens, apostrophes)
    words: /^[a-zA-Z\s\-']+$/,
    // Sentence (basic sentence structure - starts uppercase, ends with punctuation)
    sentence: /^[A-Z][\s\S]*[.?!]$/, // Improved to allow any character in between
    // Paragraph (multiple sentences)
    paragraph: /([A-Z][\s\S]*[.?!]\s*)+/, // Match one or more sentences
    // Credit Card Number (digits only, allows spaces and hyphens)
    creditCardNumber: /^[\d\s\-]+$/,
    // Alpha with spaces: Letters and spaces only
    alphaSpace: /^[a-zA-Z\s]+$/,
    // Alphanumeric with spaces: Letters, numbers, and spaces
    alphanumericSpace: /^[a-zA-Z0-9\s]+$/,
    // File name (alphanumeric, underscore, hyphen, period - common for filenames)
    filename: /^[a-zA-Z0-9_\-.]+$/,
    // File extension (alphanumeric, no spaces, often 3-4 chars)
    fileExtension: /^[a-zA-Z0-9]{2,4}$/, // Adjusted to 2-4 chars for common extensions

    // --- Location/Geographic Patterns ---
    // Latitude: Valid latitude coordinates (-90 to +90)
    latitude: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
    // Longitude: Valid longitude coordinates (-180 to +180)
    longitude: /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
    // Postal Code (Generic alphanumeric postal code - can be refined for specific countries if needed)
    postalCode: /^[a-zA-Z0-9\s\-]+$/,
    // Country Code (2 letter uppercase ISO country code)
    countryCode: /^[A-Z]{2}$/,
    // Currency Symbol (common currency symbols - $, €, £, ¥)
    currencySymbol: /^[$€£¥]$/,

    // --- Social Media/Online Patterns ---
    // Twitter Handle: Starts with @, followed by alphanumeric and underscores
    twitterHandle: /^@[a-zA-Z0-9_]+$/,
    // Instagram Username: Alphanumeric, underscore, period, 3-30 chars
    instagramUsername: /^[a-zA-Z0-9_.] {3,30}$/, // Corrected regex
    // GitHub Username: Alphanumeric and hyphen, max 39 chars
    githubUsername: /^[a-zA-Z0-9\-]{1,39}$/,
    // Domain Name (basic validation)
    domainName: /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,

    // --- Semantic/Contextual Patterns ---
    // EAN-13 Barcode
    ean13: /^\d{13}$/,
    // ISBN-10 (with or without hyphens)
    isbn10: /^(?:ISBN(?:-10)?:?)(?=[0-9X]{10}$)([0-9]{9}X|[0-9]{10})$/,
    // ISBN-13 (with or without hyphens)
    isbn13: /^(?:ISBN(?:-13)?:?)(?=[0-9]{13}$)([0-9]{13})$/,
    // Timezone Offset (e.g., +02:00, -05:30, Z)
    timezoneOffset: /^([+-](?:2[0-3]|[01]?[0-9]):[0-5][0-9]|Z)$/,
    // Mime Type (basic validation - type/subtype)
    mimeType: /^[-\w.]+\/[-\w.+]+$/,
    // Language Code (ISO 639-1 2-letter codes)
    languageCode: /^[a-z]{2}$/,
    // Country and Language Code (e.g., en-US, fr-CA)
    countryLanguageCode: /^[a-z]{2}-[A-Z]{2}$/,

    // --- Empty/Whitespace Patterns ---
    // Not Empty String (at least one non-whitespace character)
    notEmpty: /\S+/,
    // Whitespace only string
    whitespace: /^\s*$/,
    // GUID (Globally Unique Identifier) - another form of UUID
    guid: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    // Social Security Number (US - with dashes and spaces allowed) - more flexible version of 'ssn'
    socialSecurityNumber: /^\d{3}[- ]?\d{2}[- ]?\d{4}$/,
    // Year-Month (YYYY-MM)
    yearMonth: /^\d{4}-\d{2}$/,
    // Month-Day (MM-DD)
    monthDay: /^\d{2}-\d{2}$/,
    // Time with milliseconds (HH:MM:SS.mmm)
    timeMilliseconds: /^\d{2}:\d{2}:\d{2}\.\d{3}$/,

    //TODoLater:::additonal patters to be added later
};

/* throw error if the type is not supported and no custom pattern is provided.*/
export function buildRegex(options: RegexOptions): RegExp {
    if (options.pattern) {
        return new RegExp(options.pattern);
    }
    // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
    if (regexValidators.hasOwnProperty(options.type)) {
        return regexValidators[options.type];
    }
    throw new Error(`Unsupported regex type or missing pattern option: ${options.type}`);
}