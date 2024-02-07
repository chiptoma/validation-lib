import { addMethod, string } from 'yup'

import { validateIfPresent } from '@utils/index.js'

/**
 * Checks if a string contains only alphabetic characters, spaces, and hyphens.
 * @param value - The value to be checked.
 * @returns - `True` if the string contains only alphabetic, spaces or hyphens, otherwise `False`.
 * @throws - `TypeError` if `value` is not a string.
 * @example
 * ```
 * onlyAlphaSpaceHyphen('abc') // true
 * onlyAlphaSpaceHyphen('abc def') // true
 * onlyAlphaSpaceHyphen('abc-def') // true
 * onlyAlphaSpaceHyphen('abc def!') // false
 * onlyAlphaSpaceHyphen('abc-def!') // false
 * ```
 */
export const onlyAlphaSpaceHyphen = (value: string): boolean => {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected string, received ${typeof value}`)
  }

  const regex = /^[\p{L}\s-]+$/iu

  return regex.test(value.trim())
}

// Add the `onlyAlphaSpaceHyphen` method to the yup string schema.
addMethod(string, 'onlyAlphaSpaceHyphen', function (message?: string) {
  return this.test({
    name: 'onlyAlphaSpaceHyphen',
    message: message ?? 'default.onlyAlphaSpaceHyphen',
    test: (value) => validateIfPresent(onlyAlphaSpaceHyphen, value),
  })
})
