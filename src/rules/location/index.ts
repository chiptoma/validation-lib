import { mixed } from 'yup'

/**
 * Validates the location.
 *
 * TODO: Add validation rules for the location once the location is implemented.
 * @returns A yup mixed schema with validation rules for the location.
 */
export const location = () => {
  return mixed().emptyToUndefined().required()
}
