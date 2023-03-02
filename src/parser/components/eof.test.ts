import { success, failure } from '#/common'
import { split } from '#/parser'
import { eof } from './eof'

describe('eof', () => {
  it('空文字が渡されたら成功し, データはnullになる', () => {
    expect(eof(split(''))).toEqual(success([null, []]))
  })
  it('空文字以外が返されたら失敗する', () => {
    expect(eof(split('a'))).toEqual(failure())
    expect(eof(split(' '))).toEqual(failure())
    expect(eof(split('\n'))).toEqual(failure())
  })
})
