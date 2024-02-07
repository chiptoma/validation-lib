import { ValidationError } from 'yup'

/**
 * Check if an error is an instance of `ValidationError` from `yup`.
 * @param error - The error to check.
 * @returns `True` if the error is an instance of `ValidationError`, 'False' otherwise.
 */
export const isValidationError = (error: unknown): error is ValidationError => {
  if (typeof error === 'object' && error !== null) {
    // Safely access the error's constructor and name properties
    const constructor = (error as { constructor?: unknown }).constructor

    if (typeof constructor === 'function') {
      const constructorName = (constructor as { name?: unknown }).name

      // Compare the constructor name to "ValidationError", accounting for yup's naming
      return typeof constructorName === 'string' && constructorName === ValidationError.prototype.constructor.name
    }
  }

  return false
}
