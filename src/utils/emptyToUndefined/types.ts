import 'yup'

// Extend the Yup StringSchema and MixedSchema interface to include the `emptyToUndefined` method
declare module 'yup' {
  interface StringSchema {
    emptyToUndefined(): StringSchema
  }

  interface MixedSchema {
    emptyToUndefined(): MixedSchema
  }
}
