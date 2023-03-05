import { success, failure } from '#/common'
import { type Parser, type CharArray } from '#/parser'

export const then = <T1 extends unknown[], T2 extends unknown[]>(
  parser1: Parser<T1>,
  parser2: Parser<T2>
): Parser<[...T1, ...T2]> => {
  return (input: CharArray) => {
    const res1 = parser1(input)
    if (res1.tag === 'failure') return res1

    const [, rest] = res1.data
    const res2 = parser2(rest)

    return res2.tag === 'success' ? success([[...res1.data[0], ...res2.data[0]], res2.data[1]]) : failure()
  }
}
