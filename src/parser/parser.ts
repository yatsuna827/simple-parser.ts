import type { Result } from '#/common'
import type { CharArray } from './charArray'

export type Parser<T extends unknown[]> = (input: CharArray) => Result<[T, CharArray]>
