import { Reference, addMethod, string } from 'yup'

import { validateIfPresent } from '@utils/index.js'

// Add the `requiredWhen` method to the yup string schema
addMethod(string, 'requiredWhen', function (ref: Reference & { label?: string }, refLabel?: string, message?: string) {
  return this.test({
    name: 'requiredWhen',
    message: message ?? 'validation:default.requiredWhen',
    params: {
      reference: ref.path,
      referenceLabel: refLabel ?? ref.label ?? ref.path,
    },
    test: function (value) {
      return validateIfPresent(() => !!value, this.resolve(ref))
    },
  })
})
