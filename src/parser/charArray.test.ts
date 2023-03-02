import { split, shift } from './charArray'

describe('split', () => {
  it('文字列を1文字ずつに分割する', () => {
    expect(split('abc')).toEqual(['a', 'b', 'c'])
  })
  it('コードポイント単位で分割される', () => {
    expect(split('吉野家')).toEqual(['吉', '野', '家'])
    expect(split('𠮷野家')).toEqual(['𠮷', '野', '家'])
  })
})

describe('shift', () => {
  it('先頭の文字を切り出す', () => {
    expect(shift(split('abc'))).toEqual(['a', ['b', 'c']])
  })
  it('1文字だけの場合はrestが空になる', () => {
    expect(shift(split('a'))).toEqual(['a', []])
  })
  it('空の配列が渡された場合はundefinedと空の配列を返す', () => {
    expect(shift(split(''))).toEqual([undefined, []])
  })
})
