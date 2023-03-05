import { type Parser, type CharArray } from '#/parser'

export const or = <T1 extends unknown[], T2 extends unknown[]>(
  parser1: Parser<T1>,
  parser2: Parser<T2>
): Parser<T1 | T2> => {
  return (input: CharArray) => {
    const first = parser1(input)
    if (first.tag === 'success') return first

    return parser2(input)
  }
}
