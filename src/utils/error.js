
export const throwIf = (condition, toThrow) => {
  if (!!condition) { throw toThrow }
}
