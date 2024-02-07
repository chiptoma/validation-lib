import { addMethod, string } from 'yup'

import { validateIfPresent } from '@utils/index.js'

/**
 * Check if a string is a valid company name
 * @param value - The value to check.
 * @returns - `True` if the value is a valid company name, 'False' otherwise.
 * @throws - 'TypeError' if `value` is not a string.
 */
export const isCompanyName = (value: string): boolean => {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected value as string, got ${typeof value}`)
  }

  const regex = /^[\p{L}\p{N}]([\p{L}\p{N}\s]|[.,'&()-](?![.,'&()-]))*[\p{L}\p{N}]$/iu

  return regex.test(value.trim())
}

// Add the 'isCompanyName' method to the yup string schema.
addMethod(string, 'isCompanyName', function (message?: string) {
  return this.test({
    name: 'isCompanyName',
    message: message ?? 'default.isCompanyName',
    test: (value) => validateIfPresent(isCompanyName, value),
  })
})
