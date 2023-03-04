import { success, failure } from '#/common'
import { split } from '#/parser'
import { not } from './not'
import { eof } from '#/parser/components/eof'

describe('not eof', () => {
  it('空文字が以外が渡されたら成功し、空文字が渡されたら失敗する', () => {
    const notEOF = not(eof)
    expect(notEOF(split('a'))).toEqual(success([null, ['a']]))
    expect(notEOF(split(''))).toEqual(failure())
  })
})
