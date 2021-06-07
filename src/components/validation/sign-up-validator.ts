import { i18nCreator } from '../localization/i18n';
import { Errors, IError, User } from '../types/form-fields';

export type Validator = (user: User) => IError | undefined;

const i18nSignUpErrors = i18nCreator('signup.errors');

// If it is required, change this implementation use one of the known libraries like
// https://github.com/validatorjs/validator.js
const isEmail = (email: string) => {
  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  // eslint-disable-next-line
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const validateUsername: Validator = (user: User): IError | undefined => {
  if (!user || typeof user.username !== 'string' || user.username.trim().length === 0) {
    return { code: 'client', message: i18nSignUpErrors('username') };
  }
  return undefined;
};
const validateEmail: Validator = (user: User): IError | undefined => {
  if (!user || typeof user.email !== 'string' || !isEmail(user.email)) {
    return { code: 'client', message: i18nSignUpErrors('email') };
  }
  return undefined;
};
const validatePassword: Validator = (user: User): IError | undefined => {
  if (!user || typeof user.password !== 'string' || user.password.trim().length < 8) {
    return { code: 'client', message: i18nSignUpErrors('password') };
  }
  return undefined;
};
const validatePasswordConfirm: Validator = (user: User): IError | undefined => {
  if (!user || user.passwordConfirm !== user.password) {
    return { code: 'client', message: i18nSignUpErrors('passwordConfirm') };
  }
  return undefined;
};

export const signUpValidator = {
  validate: (user: User): Errors => {
    return {
      username: validateUsername(user),
      email: validateEmail(user),
      password: validatePassword(user),
      passwordConfirm: validatePasswordConfirm(user),
    };
  },
};
