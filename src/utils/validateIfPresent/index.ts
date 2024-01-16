// Generic type for a validation function
export type SyncValidationFn<T, A extends unknown[]> = (value: T, ...args: A) => boolean
export type AsyncValidationFn<T, A extends unknown[]> = (value: T, ...args: A) => Promise<boolean>

/**
 * Validates a value if it is present before running the validation function.
 *
 * If the value is null, undefined, empty string, empty object, or empty array, it is considered valid.
 * @param validationFn - The validation function to run on the value.
 * @param value - The value to validate.
 * @param args - Any additional arguments to pass to the validation function
 * @returns A boolean or Promise<boolean> indicating whether the value is valid
 */
export const validateIfPresent = <T, A extends unknown[]>(
  validationFn: SyncValidationFn<T, A> | AsyncValidationFn<T, A>,
  value: T | undefined,
  ...args: A
): boolean | Promise<boolean> => {
  // If value is null, undefined, empty string, empty object, or empty array, consider it valid
  if (
    value === undefined ||
    value === null ||
    value === '' ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return true
  }

  // Determine if the validation function is async
  const isAsync = validationFn.constructor.name === 'AsyncFunction'

  // Directly call the validation function with the provided arguments
  return isAsync
    ? (validationFn as AsyncValidationFn<T, A>).apply(undefined, [value, ...args])
    : (validationFn as SyncValidationFn<T, A>).apply(undefined, [value, ...args])
}
