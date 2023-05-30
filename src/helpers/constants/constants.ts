export const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string;

/// regex
export const PASSWORD_LENGTH_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;

export const IS_SERVER = typeof window === "undefined";
