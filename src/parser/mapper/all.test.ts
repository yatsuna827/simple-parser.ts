import { success, failure } from '#/common'
import { type ParseResult, split } from '#/parser'
import { anyChar, char, eof } from '#/parser/components'
import { all } from './all'

describe('all', () => {
  describe('char(a) => char(b) => char(c)', () => {
    const p = all(char('a'), char('b'), char('c'))

    it('"abc"を受け付ける', () => {
      const result = p(split('abc')) satisfies ParseResult<[string, string, string]>
      expect(result).toEqual(success([['a', 'b', 'c'], []]))
    })
    it('"abcd"を受け付ける', () => {
      const result = p(split('abcd')) satisfies ParseResult<[string, string, string]>
      expect(result).toEqual(success([['a', 'b', 'c'], ['d']]))
    })
    it('いずれかが失敗したら失敗', () => {
      expect(p(split('bac'))).toEqual(failure())
      expect(p(split('aac'))).toEqual(failure())
      expect(p(split('abd'))).toEqual(failure())
    })
  })
  describe('allのネスト', () => {
    const p = all(all(char('a'), char('b')), all(anyChar, char('x'), eof))

    it('"ab.x"を受け付ける', () => {
      const result = p(split('ab吉x')) satisfies ParseResult<[string, string, string, string]>
      expect(result).toEqual(success([['a', 'b', '吉', 'x'], []]))
    })
    it('失敗', () => {
      expect(p(split('abcxx'))).toEqual(failure())
      expect(p(split('aa'))).toEqual(failure())
      expect(p(split('baa'))).toEqual(failure())
    })
  })
})
