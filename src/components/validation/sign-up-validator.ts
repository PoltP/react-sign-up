import { i18nCreator } from '../localization/i18n';
import { Errors, User } from '../types/form-fields';

const i18nSignUpErrors = i18nCreator('signup.errors');

// If it is required, change this implementation use one of the known libraries like
// https://github.com/validatorjs/validator.js
const isEmail = (email: string) => {
  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  // eslint-disable-next-line
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const signUpValidator = {
  validate: (user: User) => {
    const errors: Errors = {};

    if (!user || typeof user.username !== 'string' || user.username.trim().length === 0) {
      errors.username = { message: i18nSignUpErrors('username') };
    }

    if (!user || typeof user.email !== 'string' || !isEmail(user.email)) {
      errors.email = { message: i18nSignUpErrors('email') };
    }

    if (!user || typeof user.password !== 'string' || user.password.trim().length < 8) {
      errors.password = { message: i18nSignUpErrors('password') };
    }

    if (!user || user.passwordConfirm !== user.password) {
      errors.passwordConfirm = { message: i18nSignUpErrors('passwordConfirm') };
    }

    const hasErrors = Object.keys(errors).length > 0;
    return {
      isValid: !hasErrors,
      errors: hasErrors ? errors : undefined,
    };
  },
};
