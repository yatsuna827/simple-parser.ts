import { success, failure } from '#/common'
import { type ParseResult, split } from '#/parser'
import { anyChar } from '#/parser/components'
import { repeat } from './repeat'

describe('repeat', () => {
  describe('repeat 3 ~', () => {
    const p = repeat(anyChar, 3)

    it('3文字', () => {
      const result = p(split('abc')) satisfies ParseResult<string[]>
      expect(result).toEqual(success([['a', 'b', 'c'], []]))
    })
    it('4文字', () => {
      const result = p(split('aaaa')) satisfies ParseResult<string[]>
      expect(result).toEqual(success([['a', 'a', 'a', 'a'], []]))
    })
    it('2文字 => 失敗', () => {
      const result = p(split('aa')) satisfies ParseResult<string[]>
      expect(result).toEqual(failure())
    })
    it('0文字 => 失敗', () => {
      const result = p(split('')) satisfies ParseResult<string[]>
      expect(result).toEqual(failure())
    })
  })
  describe('repeat 3 ~ 5', () => {
    const p = repeat(anyChar, 3, 5)

    it('3文字', () => {
      const result = p(split('abc')) satisfies ParseResult<string[]>
      expect(result).toEqual(success([['a', 'b', 'c'], []]))
    })
    it('5文字', () => {
      const result = p(split('aaaaa')) satisfies ParseResult<string[]>
      expect(result).toEqual(success([['a', 'a', 'a', 'a', 'a'], []]))
    })
    it('5文字以上でも5文字で打ち切る', () => {
      const result = p(split('aaaaaa')) satisfies ParseResult<string[]>
      expect(result).toEqual(success([['a', 'a', 'a', 'a', 'a'], ['a']]))
    })
  })
  describe('repeat just 4', () => {
    const p = repeat(anyChar, 4, 4)

    it('3文字 => 失敗', () => {
      const result = p(split('aaa')) satisfies ParseResult<string[]>
      expect(result).toEqual(failure())
    })
    it('4文字', () => {
      const result = p(split('aaaa')) satisfies ParseResult<string[]>
      expect(result).toEqual(success([['a', 'a', 'a', 'a'], []]))
    })
    it('5文字', () => {
      const result = p(split('aaaaa')) satisfies ParseResult<string[]>
      expect(result).toEqual(success([['a', 'a', 'a', 'a'], ['a']]))
    })
  })

  describe('assertion error', () => {
    it('min < 0', () => {
      expect(() => repeat(anyChar, -1)).toThrow()
    })

    it('max < 0', () => {
      expect(() => repeat(anyChar, 1, -1)).toThrow()
    })

    it('max < min', () => {
      expect(() => repeat(anyChar, 3, 2)).toThrow()
    })

    it('min < 0 and max < 0', () => {
      expect(() => repeat(anyChar, -2, -2)).toThrow()
    })
  })
})
