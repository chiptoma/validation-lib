import { addMethod, string } from 'yup'

import { validateIfPresent } from '@utils'

/**
 * Checks if a string contains only alphanumeric characters, spaces, and hyphens.
 * @param value - The value to be checked.
 * @returns - `True` if the string contains only alphanumeric characters, spaces, and hyphens, otherwise `False`.
 * @throws - `TypeError` if `value` is not a string.
 * @example
 * ```
 * onlyAlphaNumericSpaceHyphen('abc123') // true
 * onlyAlphaNumericSpaceHyphen('abc 123') // true
 * onlyAlphaNumericSpaceHyphen('abc-123') // true
 * onlyAlphaNumericSpaceHyphen('abc 123!') // false
 * onlyAlphaNumericSpaceHyphen('abc-123!') // false
 * ```
 */
export const onlyAlphaNumericSpaceHyphen = (value: string): boolean => {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected string, received ${typeof value}`)
  }

  const regex = /^[\p{L}\d\s-]+$/iu

  return regex.test(value.trim())
}

// Add the `onlyAlphaNumericSpaceHyphen` method to the yup string schema.
addMethod(string, 'onlyAlphaNumericSpaceHyphen', function (message?: string) {
  return this.test({
    name: 'onlyAlphaNumericSpaceHyphen',
    message: message ?? 'validation:default.onlyAlphaNumericSpaceHyphen',
    test: (value) => validateIfPresent(onlyAlphaNumericSpaceHyphen, value),
  })
})
