import { ValidationError } from 'yup'

/**
 * Check if an error is an instance of `ValidationError` from `yup`.
 * @param error - The error to check.
 * @returns `True` if the error is an instance of `ValidationError`, 'False' otherwise.
 */
export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError
}
