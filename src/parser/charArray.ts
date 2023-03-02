import type { Branded } from '#/common'

export type CharArray = Branded<readonly string[], 'CharArray'>
const charArray = (arr: readonly string[]): CharArray => arr as CharArray

export const split = (str: string): CharArray => charArray([...str])
export const shift = (arr: CharArray): [c: string | undefined, rest: CharArray] => {
  const [head, ...rest] = arr
  return [head, charArray(rest)]
}
