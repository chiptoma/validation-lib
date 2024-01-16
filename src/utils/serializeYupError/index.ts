import { ValidationError } from 'yup'

/**
 * Serializes the Yup validation error into an array of objects containing the `path` and `message` of each error.
 * If the error does not contain any inner errors, it will return an array with a single object containing the `path` and `message` of the error.
 * @param error - The Yup validation error.
 * @returns - An array of objects containing the `path` and `message` of each error.
 * @throws - Will throw an `TypeError` if `error` is not a Yup `ValidationError`.
 * @example
 * ```
 * const schema = yup.object().shape({
 *  name: yup.string().required(),
 * age: yup.number().required().positive().integer(),
 * email: yup.string().email(),
 * website: yup.string().url(),
 * createdOn: yup.date().default(function () {
 *  return new Date()
 * }),
 *
 * })
 *
 * // Returns [{ path: 'name', message: 'name is a required field' }]
 * serializeYupError(await schema.validate({}))
 * ```
 */
export const serializeYupError = (error: ValidationError) => {
  if (!(error instanceof ValidationError)) {
    throw new TypeError(`Expected error as an Yup ValidationError, got ${typeof error}`)
  }

  return error.inner.length === 0
    ? [{ path: error.path, message: error.message }]
    : error.inner.map((error) => ({
        path: error.path,
        message: error.message,
      }))
}
