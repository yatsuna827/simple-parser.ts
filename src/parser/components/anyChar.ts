import { success, failure } from '#/common'
import { type Parser, shift } from '#/parser'

export const anyChar: Parser<string> = (input) => {
  const [head, rest] = shift(input)
  return head != null ? success([head, rest]) : failure()
}
