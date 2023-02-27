import { success, failure } from '../../common'
import type { Parser } from '../parser'
import { shift } from '../charArray'

export const anyChar: Parser<string> = (input) => {
  const [head, rest] = shift(input)
  return head != null ? success([head, rest]) : failure()
}
