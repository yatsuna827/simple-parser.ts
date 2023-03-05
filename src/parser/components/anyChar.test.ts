import { success, failure } from '#/common'
import { split } from '#/parser'
import { anyChar } from './anyChar'

describe('anyChar', () => {
  it('先頭の1文字だけを切り取る', () => {
    expect(anyChar(split('abc'))).toEqual(success([['a'], ['b', 'c']]))
    expect(anyChar(split('1'))).toEqual(success([['1'], []]))
  })
  it('空文字が渡された場合は失敗する', () => {
    expect(anyChar(split(''))).toEqual(failure())
  })
})
