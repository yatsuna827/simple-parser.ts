import { success, failure } from '#/common'
import { type ParseResult, split } from '#/parser'
import { char, eof } from '#/parser/components'
import { then } from './then'

describe('then', () => {
  describe('char(a) => char(b)', () => {
    const p = then(char('a'), char('b'))

    it('1つ目のパースが成功したら続いて2つ目のパースを行う', () => {
      const result = p(split('abc')) satisfies ParseResult<[string, string]>
      expect(result).toEqual(success([['a', 'b'], ['c']]))
    })
    it('いずれかが失敗したら失敗', () => {
      expect(p(split('bac'))).toEqual(failure())
      expect(p(split('aac'))).toEqual(failure())
    })
  })
  describe('char(a) => eof', () => {
    const p = then(char('a'), eof)

    it('1つ目のパースが成功したら続いて2つ目のパースを行う', () => {
      const result = p(split('a')) satisfies ParseResult<[string]>
      expect(result).toEqual(success([['a'], []]))
    })
    it('いずれかが失敗したら失敗', () => {
      expect(p(split('bac'))).toEqual(failure())
      expect(p(split('aa'))).toEqual(failure())
    })
  })
  describe('thenのネスト', () => {
    const p = then(char('a'), then(char('b'), eof))

    it('"ab"を受け付ける', () => {
      const result = p(split('ab')) satisfies ParseResult<[string, string]>
      expect(result).toEqual(success([['a', 'b'], []]))
    })
    it('失敗', () => {
      expect(p(split('abc'))).toEqual(failure())
      expect(p(split('aa'))).toEqual(failure())
      expect(p(split('baa'))).toEqual(failure())
    })
  })
})
