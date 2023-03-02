import type { Result } from '#/common'
import type { CharArray } from './charArray'

export type Parser<T> = (input: CharArray) => Result<[T, CharArray]>
