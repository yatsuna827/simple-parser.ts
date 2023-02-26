
type Type = "Command" | "Statement" | "Block"

type Input = readonly string[]

type Success<T> = {
  tag: "success"
  data: T
}

type Failed = {
  tag: "failed"
}

type Result<T> = Success<T> | Failed

type ParserResult<T> = Result<[data: T, rest: readonly string[]]>

type Parser<T> = (input: Input) => ParserResult<T>


const anyChar: Parser<string> = (input) => {
  if (input.length === 0) return {
    tag: "failed"
  }

  const [head, ...rest] = input

  return {
    tag: "success",
    data: [head, rest]
  }
}
