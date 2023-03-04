import { success, failure } from '#/common'
import { type Parser, type CharArray } from '#/parser'

export const not = <T>(parser: Parser<T>): Parser<null> => {
  return (input: CharArray) => (parser(input).tag === 'failure' ? success<[null, CharArray]>([null, input]) : failure())
}
