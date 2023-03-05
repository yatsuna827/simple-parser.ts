import { type Parser } from '#/parser'
import { failure } from '#/common'
import { anyChar } from './anyChar'

export const matchedChar: (predicate: (c: string) => boolean) => Parser<[string]> = (predicate) => {
  return (input) => {
    const result = anyChar(input)
    return result.tag === 'success' && predicate(result.data[0][0]) ? result : failure()
  }
}
