export type Field = 'unknown' | 'username' | 'email' | 'password' | 'passwordConfirm';

export interface IError {
    code?: string,
    message: string
}

export type SignUpFormFields<T> = {[key in Field]?: T};

export type Errors = SignUpFormFields<IError>;

export type User = Omit<SignUpFormFields<string>, 'unknown'>;