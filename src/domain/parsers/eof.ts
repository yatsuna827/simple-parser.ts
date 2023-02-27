import type { Parser } from '../parser'
import { shift } from '../charArray'
import { success, failure } from '../../common'

export const eof: Parser<null> = (input) => {
  const [head, rest] = shift(input)
  return head == null ? success([null, rest]) : failure()
}
