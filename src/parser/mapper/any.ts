import { type Success, failure } from '#/common'
import { type Parser, type CharArray } from '#/parser'

type A<T extends Parser<unknown[]>[]> = T extends [Parser<infer Head>, ...infer Rest]
  ? Rest extends Parser<unknown[]>[]
    ? Head | A<Rest>
    : never
  : never

export const any = <T extends Parser<unknown[]>[]>(...parsers: T): Parser<A<T>> => {
  return (input: CharArray) => {
    for (const p of parsers) {
      const result = p(input)
      if (result.tag === 'success') return result as Success<[A<T>, CharArray]>
    }

    return failure()
  }
}
