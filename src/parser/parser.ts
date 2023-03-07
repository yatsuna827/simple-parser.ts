import type { Result } from '#/common'
import type { CharArray } from './charArray'

export type ParseResult<T extends unknown[]> = Result<[T, CharArray]>
export type Parser<T extends unknown[]> = (input: CharArray) => ParseResult<T>
