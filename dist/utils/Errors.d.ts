declare class HTTPError extends Error {
    status: number;
    constructor(message: string, status: number);
}
export declare const notFound: (msg?: string) => HTTPError;
export declare const badRequest: (msg?: string) => HTTPError;
export declare const serverError: (msg?: string) => HTTPError;
export declare const authenticationError: (msg?: string) => HTTPError;
export declare const authorizationError: (msg?: string) => HTTPError;
export declare function invalidInput(invalidInput: any): void;
export declare function unauthorized(unauthorized: any): void;
export {};
