import { success, failure } from '#/common'
import { type ParseResult, split } from '#/parser'
import { char, eof, matchedChar } from '#/parser/components'
import { any } from './any'

describe('any', () => {
  describe('char(a) or char(b) or matchedChar(is あ,い,う) ', () => {
    const p = any(
      char('a'),
      char('b'),
      matchedChar((c) => ['あ', 'い', 'う'].includes(c))
    )

    it('a,b,あ,い,う を受け付ける', () => {
      const result = p(split('a')) satisfies ParseResult<[string]>
      expect(result).toEqual(success([['a'], []]))
      expect(p(split('b'))).toEqual(success([['b'], []]))
      expect(p(split('あ'))).toEqual(success([['あ'], []]))
      expect(p(split('い'))).toEqual(success([['い'], []]))
      expect(p(split('うえお'))).toEqual(success([['う'], ['え', 'お']]))
    })
    it('失敗', () => {
      expect(p(split('xxx'))).toEqual(failure())
      expect(p(split('zab'))).toEqual(failure())
      expect(p(split(' い'))).toEqual(failure())
    })
  })
  describe('char(0) or char( ) or eof', () => {
    const p = any(char('0'), char(' '), eof)

    it('"0", " ", eof を受け付ける', () => {
      const result = p(split('0')) satisfies ParseResult<[string] | []>
      expect(result).toEqual(success([['0'], []]))
      expect(p(split(' ?'))).toEqual(success([[' '], ['?']]))
      expect(p(split(''))).toEqual(success([[], []]))
    })
    it('失敗', () => {
      expect(p(split('x'))).toEqual(failure())
    })
  })
})
