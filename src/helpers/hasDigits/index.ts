import { addMethod, string } from 'yup'

import { validateIfPresent } from '@utils/index.js'

/**
 * Checks if a string has a minimum and optional maximum number of digits.
 * @param value - The value to be checked.
 * @param min - The minimum number of digits.
 * @param [max] - The optional maximum number of digits (Optional).
 * @returns - `True` if the string has a minimum and optional maximum number of digits, otherwise `False`.
 * @throws - `TypeError` if `value` is not a string, `min` is not an non-negative integer, or `max` is defined but not an non-negative integer.
 * @throws - `RangeError` if `min` is greater than `max`.
 */
export const hasDigits = (value: string, min: number, max?: number): boolean => {
  if (typeof value !== 'string') throw new TypeError(`Expected value as string, received ${typeof value}`)
  if (!Number.isInteger(min) || min < 0) throw new TypeError(`Expected min as non-negative integer, received ${min}`)
  if (max !== undefined && (!Number.isInteger(max) || max < 0))
    throw new TypeError(`Expected max as non-negative integer or undefined, received ${max}`)
  if (max !== undefined && min > max)
    throw new RangeError(`Expected min (${min}) to be less than or equal to max (${max})`)

  const digitCount = value.replaceAll(/\D/g, '').length // Directly count digits

  return digitCount >= min && (max === undefined || digitCount <= max)
}

// Add the `hasDigits` method to the yup string schema
addMethod(string, 'hasDigits', function (min: number, max?: number, message?: string) {
  return this.test({
    name: 'hasDigits',
    message: message ?? 'default.hasDigits',
    params: { min, max },
    test: (value) => validateIfPresent(hasDigits, value, min, max),
  })
})
