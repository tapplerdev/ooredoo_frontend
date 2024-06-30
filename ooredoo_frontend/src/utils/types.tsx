export type ValueOf<T> = T[keyof T];
export type ObjectEnum<T extends Record<string,string>> = ValueOf<T>;
