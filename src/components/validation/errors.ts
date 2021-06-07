import { Errors, KnownFields, KnownField } from '../types/form-fields';

const CriticalErrorCodes = ['already_taken', 'blank', 'client'];

export const isServerError = (status: number) => status >= 500 && status <= 526;

export const getOtherErrors = (errors: Errors) =>
  Object.keys(errors)
    .filter((key) => !KnownFields.includes(key))
    .map((key) => errors[key as KnownField]?.message);

export const hasCritical = (errors: Errors) =>
  Object.keys(errors).some((key) =>
    CriticalErrorCodes.includes(errors[key as KnownField]?.code || '')
  );
