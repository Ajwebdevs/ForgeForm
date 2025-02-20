export interface RegexOptions {
    type: string;
    pattern?: string;
}
export const regexValidators: { [key: string]: RegExp } = {
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    phone: /^[+]?[\d\s\-()]+$/,
    url: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/\S*)?$/i,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    zip: /^\d{5}(?:[-\s]\d{4})?|\d{6}$/,
    indianZipCode6Digit: /^\d{6}$/,
    indianZipCode6DigitFlexible: /^(\d{6}|\d{2}[\s-]?\d{2}[\s-]?\d{2})$/,
    ip: /^(25[0-5]|2[0-4]\d|[01]?\d\d?)(\.(25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    time: /^\d{2}:\d{2}(:\d{2})?$/,
    creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/,
    hexColor: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    rgb: /^rgb\(\s*(0|[1-9]\d{0,2})\s*,\s*(0|[1-9]\d{0,2})\s*,\s*(0|[1-9]\d{0,2})\s*\)$/,
    aadhar: /^\d{12}$/,
    panCard: /^[A-Z]{3}[PCHABFGJLTE][A-Z]\d{4}[A-Z]$/i,
    indianDrivingLicense: /^[A-Z]{2}\d{2}[ ]?\d{7}$/i,
    gstNumber: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/,
    indianPassport: /^[A-Z]\d{7}$/i,
    alphanumeric: /^[A-Za-z0-9]+$/,
    alpha: /^[A-Za-z]+$/,
    decimal: /^[+-]?(\d*\.)?\d+$/,
    base64: /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/,
    lowercase: /^[a-z]+$/,
    uppercase: /^[A-Z]+$/,
    strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    mediumPassword: /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    weakPassword: /^.{4,}$/,
    username: /^[a-zA-Z0-9_\-]{3,20}$/,
    hashtag: /^#[a-zA-Z0-9_]+$/,
    creditCardExpiry: /^(0[1-9]|1[0-2])\/([0-9]{2}|[0-9]{4})$/,
    cvv: /^\d{3,4}$/,
    ssn: /^\d{3}-\d{2}-\d{4}$/,
    canadianPostalCode: /^[A-Za-z]\d[A-Za-z][\s]?\d[A-Za-z]\d$/,
    ukPostcode: /^([Gg][Ii][Rr]0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/,
    ipAddress: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))|(([0-9A-Fa-f]{1,4}:){4}((((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4}:)((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))))|(([0-9A-Fa-f]{1,4}:){3}(((((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))))|(([0-9A-Fa-f]{1,4}:){2}(((((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))))|(([0-9A-Fa-f]{1,4}:){1}(((((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d))))|:(((((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))|:((25[0-5]|2[0-4]d|1dd|[1-9]?d).){3}(25[0-5]|2[0-4]d|1dd|[1-9]?d)))))(%.+)?s*$/,
    macAddress: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
    jwt: /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
    semver: /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
    integer: /^-?\d+$/,
    positiveInteger: /^[1-9]\d*$/,
    negativeInteger: /^-\d+$/,
    nonNegativeInteger: /^(0|[1-9]\d*)$/,
    nonPositiveInteger: /^-(0|[1-9]\d*)?$/,
    float: /^-?\d*\.\d+$/,
    positiveFloat: /^[1-9]\d*\.\d+$/,
    negativeFloat: /^-\d*\.\d+$/,
    percentage: /^(100(\.0{0,2})?|[0-9]{1,2}(\.[0-9]{0,2})?)%?$/,
    port: /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
    year: /^\d{4}$/,
    month: /^(0[1-9]|1[0-2])$/,
    day: /^(0[1-9]|[12]\d|3[01])$/,
    hour: /^(0\d|1\d|2[0-3])$/,
    minute: /^[0-5]\d$/,
    second: /^[0-5]\d$/,
    words: /^[a-zA-Z\s\-']+$/,
    sentence: /^[A-Z][\s\S]*[.?!]$/,
    paragraph: /([A-Z][\s\S]*[.?!]\s*)+/,
    creditCardNumber: /^[\d\s\-]+$/,
    alphaSpace: /^[a-zA-Z\s]+$/,
    alphanumericSpace: /^[a-zA-Z0-9\s]+$/,
    filename: /^[a-zA-Z0-9_\-.]+$/,
    fileExtension: /^[a-zA-Z0-9]{2,4}$/,
    latitude: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
    longitude: /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
    postalCode: /^[a-zA-Z0-9\s\-]+$/,
    countryCode: /^[A-Z]{2}$/,
    currencySymbol: /^[$€£¥₹]$/,
    twitterHandle: /^@[a-zA-Z0-9_]+$/,
    instagramUsername: /^[a-zA-Z0-9_.] {3,30}$/,
    githubUsername: /^[a-zA-Z0-9\-]{1,39}$/,
    domainName: /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
    ean13: /^\d{13}$/,
    isbn10: /^(?:ISBN(?:-10)?:?)(?=[0-9X]{10}$)([0-9]{9}X|[0-9]{10})$/,
    isbn13: /^(?:ISBN(?:-13)?:?)(?=[0-9]{13}$)([0-9]{13})$/,
    timezoneOffset: /^([+-](?:2[0-3]|[01]?[0-9]):[0-5][0-9]|Z)$/,
    mimeType: /^[-\w.]+\/[-\w.+]+$/,
    languageCode: /^[a-z]{2}$/,
    countryLanguageCode: /^[a-z]{2}-[A-Z]{2}$/,
    vin: /^[A-HJ-NPR-Z0-9]{17}$/,
    usCurrency: /^\$?(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{2})?$/,
    signedPercentage: /^[+-]?(100(\.0{0,2})?|[0-9]{1,2}(\.[0-9]{0,2})?)%?$/,
    visaCard: /^4[0-9]{12}(?:[0-9]{3})?$/,
    masterCard: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)[0-9]{12}$/,
    amexCard: /^3[47][0-9]{13}$/,
    discoverCard: /^6(?:011|5[0-9]{2}|4[4-9][0-9]|50[0-9]{2})[0-9]{12}$/,
    dinersClubCard: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    jcbCard: /^(?:2131|1800|35\d{3})\d{11}$/,
    currencySymbolCNY: /^¥$/,
    currencySymbolJPY: /^¥$/,
    currencySymbolGBP: /^£$/,
    currencySymbolEUR: /^€$/,
    genericPhoneNumber: /^[+]?[\d\s\-().]+(?:ext|x)[\d]+$/,
    ssnFlexible: /^\d{3}-?\d{2}-?\d{4}$/,
    usPhoneNumber: /^\(\d{3}\)\s?\d{3}-\d{4}$/,
    time12h: /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/i,
    simpleURL: /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
    youtubeURL: /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/,
    vimeoURL: /^(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)$/,
    dateSlashMDY: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/,
    dateDotDMY: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
    timeFlexibleMilliseconds: /^\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?$/,
    versionNumber: /^\d+(\.\d+)*([-._]?[a-zA-Z0-9]+)*$/,
    orderId: /^ORD-[a-zA-Z0-9_\-]+$/,
    productCode: /^[a-zA-Z0-9\.:\-]+$/,
    trackingNumber: /^[a-zA-Z0-9]+$/,
    invoiceNumber: /^[a-zA-Z0-9\-]+$/,
    eventId: /^[a-zA-Z0-9_]+$/,
    jobId: /^[a-zA-Z0-9\-]+$/,
    serialNumber: /^[a-zA-Z0-9_\-]+$/,
    modelNumber: /^[a-zA-Z0-9\-]+$/,
    sku: /^[a-zA-Z0-9_\-]+$/,
    assetTag: /^[a-zA-Z0-9\-]+$/,
    receiptNumber: /^[\d\-]+$/,
    confirmationNumber: /^[a-zA-Z0-9]+$/,
    bookingReference: /^[a-zA-Z0-9]+$/,
    ticketNumber: /^[a-zA-Z0-9\-]+$/,
    referenceCode: /^[a-zA-Z0-9_\-]+$/,
    voucherCode: /^[A-Z0-9]+$/,
    couponCode: /^[A-Z0-9]+$/,
    promotionCode: /^[A-Z0-9]+$/,
    discountCode: /^[A-Z0-9\-]+$/,
    accessCode: /^[a-zA-Z0-9]+$/,
    pinCode: /^\d{4,8}$/,
    otpCode: /^\d{6}$/,
    verificationCode: /^[a-zA-Z0-9]{6,8}$/,
    accountNumber: /^[\d\-]+$/,
    iban: /^[A-Z]{2}\d{2}[A-Za-z0-9]{4}\d{7}([A-Za-z0-9]?){0,16}$/,
    swiftCode: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
    taxId: /^[a-zA-Z0-9]+$/,
    registrationNumber: /^[a-zA-Z0-9\-]+$/,
    membershipId: /^[a-zA-Z0-9]+$/,
    referenceNumber: /^[a-zA-Z0-9_]+$/,
    applicationId: /^[a-zA-Z0-9\-]+$/,
    confirmationCode: /^[a-zA-Z0-9]+$/,
    authorizationCode: /^[a-zA-Z0-9]+$/,
    transactionId: /^[a-zA-Z0-9\-]+$/,
    paymentReference: /^[a-zA-Z0-9]+$/,
    bookingNumber: /^[a-zA-Z0-9]+$/,
    enrollmentKey: /^[a-zA-Z0-9\-]+$/,
    activationCode: /^[a-zA-Z0-9]+$/,
    unlockCode: /^[a-zA-Z0-9]+$/,
    accessKey: /^[a-zA-Z0-9]+$/,
    secretKey: /^[a-zA-Z0-9]+$/,
    notEmpty: /\S+/,
    whitespace: /^\s*$/,
    guid: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    socialSecurityNumber: /^\d{3}[- ]?\d{2}[- ]?\d{4}$/,
    yearMonth: /^\d{4}-\d{2}$/,
    monthDay: /^\d{2}-\d{2}$/,
    timeMilliseconds: /^\d{2}:\d{2}:\d{2}\.\d{3}$/,
};
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