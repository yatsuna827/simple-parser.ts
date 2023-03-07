import { success, failure } from '#/common'
import { type Parser, type CharArray } from '#/parser'

export const repeat = <T extends unknown[]>(parser: Parser<T>, min = 0, max = Infinity): Parser<T[0][]> => {
  if (min < 0) throw new Error()
  if (max < 0) throw new Error()
  if (max < min) throw new Error()

  return (input: CharArray) => {
    let state = input
    const results: T[0][] = []

    for (let i = 0; i < max; i++) {
      const result = parser(state)
      if (result.tag === 'failure') {
        return min <= i ? success([results, state]) : failure()
      }

      const [data, rest] = result.data
      results.push(...data)
      state = rest
    }

    return success([results, state])
  }
}
