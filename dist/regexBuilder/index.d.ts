export interface RegexOptions {
    type: string;
    pattern?: string;
}
export declare const regexValidators: {
    [key: string]: RegExp;
};
export declare function buildRegex(options: RegexOptions): RegExp;
