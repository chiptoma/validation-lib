import { ref, string } from 'yup'

/**
 * Validates the password confirmation.
 * @param [passwordPath] - The password schema path name, used to determine if the password confirmation is required (Default: `password`)'
 * @returns - A Yup string schema with validation rules for the password confirmation.
 */
export const passwordConfirmation = (passwordPath = 'password') => {
  return string().sameAs(ref(passwordPath)).emptyToUndefined().required()
}
