import { success, failure } from '#/common'
import { split } from '#/parser'
import { matchedChar } from './matchedChar'

describe('matchedChar "a" or "b"', () => {
  const parser = matchedChar((c) => c === 'a' || c === 'b')

  it('"a" 1文字', () => {
    expect(parser(split('a'))).toEqual(success(['a', []]))
  })
  it('"b" 1文字', () => {
    expect(parser(split('b'))).toEqual(success(['b', []]))
  })
  it('"a"から始まる文字列', () => {
    expect(parser(split('abc'))).toEqual(success(['a', ['b', 'c']]))
  })
  it('"b"から始まる文字列', () => {
    expect(parser(split('bad'))).toEqual(success(['b', ['a', 'd']]))
  })

  it('"c" 1文字', () => {
    expect(parser(split('c'))).toEqual(failure())
  })
  it('"A" 1文字', () => {
    expect(parser(split('A'))).toEqual(failure())
  })
  it('条件を満たさない長い文字列', () => {
    expect(parser(split('I am a cat.'))).toEqual(failure())
  })

  it('空文字', () => {
    expect(parser(split(''))).toEqual(failure())
  })
})

describe('matchedChar 任意の文字に対して成功する', () => {
  const parser = matchedChar(() => true)

  it('"a" 1文字', () => {
    expect(parser(split('a'))).toEqual(success(['a', []]))
  })
  it('" " 1文字', () => {
    expect(parser(split(' '))).toEqual(success([' ', []]))
  })
  it('文字が切り出せなかった場合に限って失敗する', () => {
    expect(parser(split(''))).toEqual(failure())
  })
})

describe('matchedChar 常に失敗する', () => {
  const parser = matchedChar(() => false)

  it('"a" 1文字', () => {
    expect(parser(split('a'))).toEqual(failure())
  })
  it('" " 1文字', () => {
    expect(parser(split(' '))).toEqual(failure())
  })
  it('空文字', () => {
    expect(parser(split(''))).toEqual(failure())
  })
})
