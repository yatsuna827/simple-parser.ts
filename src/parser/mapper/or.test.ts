import { success, failure } from '#/common'
import { type ParseResult, split } from '#/parser'
import { char, eof } from '#/parser/components'
import { or } from './or'

describe('or', () => {
  const a_or_b = or(char('a'), char('b'))
  const a_or_eof = or(char('a'), eof)

  it('1つ目の関数がパースに成功したらその結果が返る', () => {
    const result = a_or_b(split('abc')) satisfies ParseResult<[string]>
    expect(result).toEqual(success([['a'], ['b', 'c']]))
  })
  it('1つ目の関数がパースに成功し、2つ目の関数がパースに成功したら、2つ目の結果が返る', () => {
    const result = a_or_b(split('bac')) satisfies ParseResult<[string]>
    expect(result).toEqual(success([['b'], ['a', 'c']]))
  })
  it('どちらもパースに失敗したらfailureが返る', () => {
    const result = a_or_eof(split('cab')) satisfies ParseResult<[string] | []>
    expect(result).toEqual(failure())
  })
})
