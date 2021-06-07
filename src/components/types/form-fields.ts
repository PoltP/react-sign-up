export type ErrorField = 'non_field_errors' | 'unknown' | 'server5xx' | KnownField;

export type KnownField = 'username' | 'email' | 'password' | 'passwordConfirm';
export const KnownFields = ['username', 'email', 'password', 'passwordConfirm'];

export interface IError {
  code?: string;
  message: string;
}

export type Errors = { [key in ErrorField]?: IError };

export type User = { [key in KnownField]?: string };
