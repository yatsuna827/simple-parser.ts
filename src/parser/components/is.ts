import { type Parser } from '#/parser'
import { failure } from '#/common'
import { anyChar } from './anyChar'

export const is: (c: string) => Parser<string> = (c) => {
  const [t] = c
  if (t !== c) throw new Error(`${c} is not single charactor`)

  return (input) => {
    const result = anyChar(input)
    return result.tag === 'success' && result.data[0] === c ? result : failure()
  }
}