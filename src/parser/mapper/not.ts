import { success, failure } from '#/common'
import { type Parser, type CharArray } from '#/parser'

export const not = <T extends unknown[]>(parser: Parser<T>): Parser<[]> => {
  return (input: CharArray) => (parser(input).tag === 'failure' ? success<[[], CharArray]>([[], input]) : failure())
}
