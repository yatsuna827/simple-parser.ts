declare const tag: unique symbol
export type Branded<T, Name extends string> = T & { [key in `__${Name}`]: typeof tag }
