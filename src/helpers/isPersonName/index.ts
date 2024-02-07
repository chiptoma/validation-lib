import { addMethod, string } from 'yup'

import { validateIfPresent } from '@utils/index.js'

/**
 * Check if a string is a valid person name
 * @param value - The value to check.
 * @returns - `True` if the value is a valid person name, 'False' otherwise.
 * @throws - 'TypeError' if `value` is not a string.
 */
export const isPersonName = (value: string): boolean => {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected value as string, received ${typeof value}`)
  }

  // eslint-disable-next-line security/detect-unsafe-regex
  const regex = /^\p{L}+(?:(?![\s'-]{2})[\p{L}\s'-])*\p{L}+$/iu

  return regex.test(value.trim())
}

// Add the `isPersonName` method to the yup string schema
addMethod(string, 'isPersonName', function (message?: string) {
  return this.test({
    name: 'isPersonName',
    message: message ?? 'default.isPersonName',
    test: (value) => validateIfPresent(isPersonName, value),
  })
})
