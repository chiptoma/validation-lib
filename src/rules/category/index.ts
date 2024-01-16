import { mixed } from 'yup'

/**
 * Validates a category.
 *
 * TODO: Add validation rules for the category once the category is implemented.
 * @returns A yup mixed schema with validation rules for the category.
 */
export const category = () => {
  return mixed().emptyToUndefined().required()
}
