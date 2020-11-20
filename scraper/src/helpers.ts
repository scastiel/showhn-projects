export const decodeEntities = (encodedString: string) => {
  const translate: Record<string, string> = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
  }
  const translate_re = new RegExp(
    `&(${Object.keys(translate).join('|')});`,
    'g'
  )
  return encodedString
    .replace(translate_re, (match, entity) => translate[entity])
    .replace(/&#(\d+);/gi, (match, numStr) =>
      String.fromCharCode(parseInt(numStr, 10))
    )
    .replace(/&#x([0-9a-f]+);/gi, (match, numStr) =>
      String.fromCharCode(parseInt(numStr, 16))
    )
}

export const URL_REGEXP = /https?:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]/gi

export const omit = <T, K extends keyof T>(
  obj: T | undefined | null,
  key: K
): Omit<T, K> | undefined | null => {
  if (!obj) return obj
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: _, ...rest } = obj
  return rest
}

export const omitAll = <T, K extends keyof T>(
  arr: T[] | undefined | null,
  key: K
): (Omit<T, K> | null | undefined)[] | null | undefined =>
  arr && arr.map((obj) => omit(obj, key))
