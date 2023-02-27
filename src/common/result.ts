export type Success<T> = {
  tag: 'success'
  data: T
}
export type Failure = {
  tag: 'failure'
}
export type Result<T> = Success<T> | Failure

export const success = <T>(data: T): Success<T> => ({ tag: 'success', data })
export const failure = (): Failure => ({ tag: 'failure' })
