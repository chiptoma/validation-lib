import { addMethod, string } from 'yup'

import { validateIfPresent } from '@utils/index.js'

/**
 * Checks if a string contains no more than a certain number of words.
 *
 * Words are considered as groups of characters separated by any non-alphanumeric characters.
 * @param value - The value to be checked.
 * @param maxWords - The maximum number of words allowed.
 * @returns - `True` if the string contains no more than a certain number of words, otherwise `False`.
 * @throws - `TypeError` if `value` is not a string or `maxWords` is not an non-negative integer.
 */
export const hasMaxWords = (value: string, maxWords: number): boolean => {
  if (typeof value !== 'string') throw new TypeError(`Expected string, received ${typeof value}`)
  if (!Number.isInteger(maxWords) || maxWords < 0)
    throw new TypeError(`Expected maxWords as non-negative integer, received ${String(maxWords)}`)

  const words = value.trim().split(/\W+/).filter(Boolean)

  return words.length <= maxWords
}

// Add the `hasMaxWords` method to the yup string schema
addMethod(string, 'hasMaxWords', function (maxWords: number, message?: string) {
  return this.test({
    name: 'hasMaxWords',
    message: message ?? 'validation:default.hasMaxWords',
    params: { maxWords },
    test: (value) => validateIfPresent(hasMaxWords, value, maxWords),
  })
})
