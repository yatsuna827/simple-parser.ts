import { success, failure } from '#/common'
import { split } from '#/parser'
import { char } from './char'

describe('char "a"', () => {
  const parser = char('a')

  it('正常系', () => {
    expect(parser(split('a'))).toEqual(success([['a'], []]))
    expect(parser(split('abc'))).toEqual(success([['a'], ['b', 'c']]))
  })
  it('a以外の文字が渡されたら失敗', () => {
    expect(parser(split('b'))).toEqual(failure())
  })
  it('大文字のAでもダメ', () => {
    expect(parser(split('A'))).toEqual(failure())
  })
  it('aが先頭以外に現れていても成功しない', () => {
    expect(parser(split('ba'))).toEqual(failure())
  })
  it('空文字が渡されたら失敗', () => {
    expect(parser(split(''))).toEqual(failure())
  })
  it('空文字のあとに来てもダメ', () => {
    expect(parser(split(' a'))).toEqual(failure())
  })
})

describe('char "B"', () => {
  const parser = char('B')

  it('正常系', () => {
    expect(parser(split('B'))).toEqual(success([['B'], []]))
    expect(parser(split('Bcc'))).toEqual(success([['B'], ['c', 'c']]))
  })
  it('B以外の文字が渡されたら失敗', () => {
    expect(parser(split('a'))).toEqual(failure())
  })
  it('小文字のbは失敗', () => {
    expect(parser(split('b'))).toEqual(failure())
  })
  it('Bが先頭以外に現れていても成功しない', () => {
    expect(parser(split('aB'))).toEqual(failure())
  })
  it('空文字が渡されたら失敗', () => {
    expect(parser(split(''))).toEqual(failure())
  })
})

describe('assert', () => {
  it('2文字以上の文字列を渡してはいけない', () => {
    expect(() => char('hoge')).toThrow()
  })
  it('異体字', () => {
    expect(() => char('𠮷')).not.toThrow()
  })
})
