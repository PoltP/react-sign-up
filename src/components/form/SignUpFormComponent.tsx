import React, { useEffect, useState } from 'react';
import { signUp, check } from '../../services/user';
import { Container } from './container.styled';
import { Button } from './button.styled';
import { SignUpForm } from './signup-form.styled';
import { ErrorText } from '../elements/error.styled';
import { CircleSpinner } from '../elements/circle-spinner.styled';
import { InputComponent } from '../input/InputComponent';
import { i18nCreator } from '../../localization/i18n';
import { signUpValidator } from '../validation/sign-up-validator';
import { getOtherErrors, hasCritical, isServerError } from '../validation/errors';
import type { Errors, KnownField } from '../../types/form-fields';

const i18nSignUp = i18nCreator('signup');

export const SignUpFormComponent = () => {
  const [isSent, setIsSent] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [clientErrors, setClientErrors] = useState<Errors>({});
  const [serverErrors, setServerErrors] = useState<Errors>({});

  const clear = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');

    setClientErrors({});
    setServerErrors({});
  };

  const handleValidate = (field: KnownField) => {
    const validationErrors = signUpValidator.validateField({username, email, password, passwordConfirm}, field);
    if (validationErrors) {
      return setClientErrors({
        ...clientErrors,
        ...validationErrors
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field: KnownField = event.target.name as KnownField;
    const value = event.target.value;
    switch (field) {
      case 'username':
        return setUsername(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'passwordConfirm':
        return setPasswordConfirm(value);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const user = { username, email, password, passwordConfirm };
    const validationErrors: Errors = signUpValidator.validate(user);
    setClientErrors(validationErrors);
    if (hasCritical(validationErrors) || hasCritical(serverErrors)) {
      return;
    }

    setIsSigningUp(true);
    const sendData = async () => {
      const result = await signUp(user);
      if (isServerError(result.status)) {
        setServerErrors({
          server5xx: { message: `${i18nSignUp('error')}${result.statusText}` },
        });
        return setIsSigningUp(false);
      }
      result
        .json()
        .then((data) => {
          if (data.errors) {
            setServerErrors(data.errors);
          } else {
            clear();
            setIsSent(true);
          }
        })
        .catch((e) => {
          setServerErrors({
            unknown: { message: e.message },
          });
        })
        .finally(() => setIsSigningUp(false));
    };

    sendData();
  };

  useEffect(() => {
    const checkUsername = async () => {
      setIsCheckingUsername(true);
      const result = await check(username);
      result
        .json()
        .then((data) => {
          if (data.errors) {
            setServerErrors((prevErrors) => ({
              ...prevErrors,
              ...data.errors,
            }));
          } else {
            setServerErrors((prevErrors) => ({
              ...prevErrors,
              username: undefined,
            }));
          }
        })
        .catch((e) => {
          setServerErrors((prevErrors) => ({
            ...prevErrors,
            unknown: { message: e.message },
          }));
        })
        .finally(() => setIsCheckingUsername(false));
    };

    username && checkUsername();
  }, [username]);

  const otherErrors = getOtherErrors(serverErrors);
  return (
    <Container>
      {i18nSignUp('title')}
      <SignUpForm>
        {isSent ? (
          <>{i18nSignUp('success')}</>
        ) : (
          <>
            <InputComponent
              label={i18nSignUp('email')}
              type="email"
              name="email"
              value={email}
              error={clientErrors['email'] || serverErrors['email']}
              onChange={handleChange}
              onValidate={handleValidate}
            />
            <InputComponent
              label={i18nSignUp('username')}
              type="text"
              name="username"
              value={username}
              error={clientErrors['username'] || serverErrors['username']}
              isLoading={isCheckingUsername}
              onChange={handleChange}
              onValidate={handleValidate}
            />
            <InputComponent
              label={i18nSignUp('password')}
              type="password"
              name="password"
              value={password}
              error={clientErrors['password'] || serverErrors['password']}
              onChange={handleChange}
              onValidate={handleValidate}
            />
            <InputComponent
              label={i18nSignUp('passwordConfirm')}
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              error={clientErrors['passwordConfirm']}
              onChange={handleChange}
              onValidate={handleValidate}
            />
            <Button disabled={isSigningUp} onClick={isSigningUp ? undefined : handleSubmit}>
              {i18nSignUp(isSigningUp ? 'signingup' : 'submit')}
              {isSigningUp && <CircleSpinner />}
              <ErrorText visible={!!otherErrors.length}>{otherErrors.join('\n')}</ErrorText>
            </Button>
          </>
        )}
      </SignUpForm>
    </Container>
  );
};
