import { success, failure } from '#/common'
import { type Parser, shift } from '#/parser'

export const eof: Parser<[]> = (input) => {
  const [head, rest] = shift(input)
  return head == null ? success([[], rest]) : failure()
}
