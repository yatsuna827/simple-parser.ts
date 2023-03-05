import { success, failure } from '#/common'
import { type Parser, type CharArray } from '#/parser'

type A<T extends Parser<unknown[]>[]> = T extends [Parser<infer Head>, ...infer Rest]
  ? Rest extends Parser<unknown[]>[]
    ? [...Head, ...A<Rest>]
    : never
  : []

export const all = <T extends Parser<unknown[]>[]>(...parsers: T): Parser<A<T>> => {
  return (input: CharArray) => {
    const retArray: unknown[] = []

    let state = input
    for (const p of parsers) {
      const result = p(state)
      if (result.tag === 'failure') return failure()
      const [data, rest] = result.data
      retArray.push(...data)
      state = rest
    }

    return success([retArray as A<T>, state])
  }
}
