import { addMethod, string } from 'yup'

import { validateIfPresent } from '@utils/index.js'

/**
 * Checks if a string has a minimum and optional maximum number of uppercase letters.
 * @param value - The value to be checked.
 * @param min - The minimum number of uppercase letters.
 * @param [max] - The maximum number of uppercase letters (Optional).
 * @returns `True` if the string has a minimum and optional maximum number of uppercase letters, otherwise `false`.
 * @throws `TypeError` if `value` is not a string, `min` is not an non-negative integer, or `max` is defined but not an non-negative integer.
 * @throws `RangeError` if `min` is greater than `max`.
 */
export const hasUppercase = (value: string, min: number, max?: number): boolean => {
  if (typeof value !== 'string') throw new TypeError(`Expected value as string, received ${typeof value}`)
  if (!Number.isInteger(min) || min < 0)
    throw new TypeError(`Expected min as non-negative integer, received ${String(min)}`)
  if (max !== undefined && (!Number.isInteger(max) || max < 0))
    throw new TypeError(`Expected max as non-negative integer or undefined, received ${String(max)}`)
  if (max !== undefined && min > max)
    throw new RangeError(`Expected min (${String(min)}) to be less than or equal to max (${String(max)})`)

  const upperCaseCount = (value.match(/[A-Z]/g) ?? []).length

  return upperCaseCount >= min && (max === undefined || upperCaseCount <= max)
}

// Add the `hasUppercase` method to the yup string schema
addMethod(string, 'hasUppercase', function (min: number, max?: number, message?: string) {
  return this.test({
    name: 'hasUppercase',
    message: message ?? 'validation:default.hasUppercase',
    params: { min, max },
    test: (value) => validateIfPresent(hasUppercase, value, min, max),
  })
})
