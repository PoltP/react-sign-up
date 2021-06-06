
import React, { useEffect, useState } from 'react';
import {config} from '../../config';
import { Container } from './container.styled';
import { Button } from './button.styled';
import { SignUpForm } from './signup-form.styled';
import { ErrorText } from '../elements/error.styled';
import { InputComponent } from '../input/InputComponent';
import { i18nCreator } from '../localization/i18n';
import { signUpValidator } from '../validation/sign-up-validator';
import { Errors, KnownField, KnownFields } from '../types/form-fields';

const i18nSignUp = i18nCreator('signup');

const POST_HEADER = {
  'Accept': 'application/json',
  'Content-type': 'application/json; charset=UTF-8'
};

const isServerError = (status: number) => status >= 500 && status <= 526;

const getOtherErrors = (errors: Errors) =>
  Object.keys(errors).filter(key => !KnownFields.includes(key)).map(key => errors[key]?.message);

export const SignUpFormComponent = () => {
  const [isSent, setIsSent] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  //const [user, setUser] = useState<User>({username: '', email: '', password: '', passwordConfirm: ''});
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  
  const [errors, setErrors] = useState<Errors>({});

  const clear = () => {
    // setUser({username: '', email: '', password: '', passwordConfirm: ''});
    setUsername('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')

    setErrors({})
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field: KnownField = event.target.name as KnownField;
    const value = event.target.value;
    // setUser({...user, [field]: value});
    switch(field) {
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

    const user = {username, email, password, passwordConfirm};/*user.*/
    const validation = signUpValidator.validate(user);
    if (!validation.isValid) {
      return setErrors({
        ...errors,
        ...validation.errors
      });
    }

    setIsSigningUp(true);
    const sendData = async () => {
      const result = await fetch(`${config.serverAPI}/signup`, {
        method: 'POST',
        body: JSON.stringify({username: user.username, email: user.email, password: user.password}),
        headers: POST_HEADER
      });
      if (isServerError(result.status)) {
        setErrors({
          'server5xx': {message: `${i18nSignUp('error')}${result.statusText}`}
        });
        return setIsSigningUp(false);
      }
      result
        .json()
        .then(data => {
          if (data.errors) {
            setErrors(data.errors);
          } else {
            clear();
            setIsSent(true);
          }
        })
        .catch(e => {
          setErrors({
            'unknown': {message: e.message}
          })
        })
        .finally(() => setIsSigningUp(false));
    };

    sendData();
  }

  useEffect(() => {
    const checkUsername = async () => {
      const result = await fetch(`${config.serverAPI}/check`, {
        method: 'POST',
        body: JSON.stringify({/*username: user.*/username}),
        headers: POST_HEADER
      });
      result
        .json()
        .then(data => {
          if (data.errors) {
            setErrors(prevErrors => ({
              ...prevErrors,
              ...data.errors
            }));
          } else {
            setErrors(prevErrors => ({
              ...prevErrors,
              username: undefined
            }));
          }
        })
        .catch(e => {
          setErrors(prevErrors => ({
            ...prevErrors,
            'unknown': {message: e.message}
          }))
        });
    };

    /*user.*/username && checkUsername();
  }, [/*user.*/username])


  const otherErrors = getOtherErrors(errors);
  return <Container>
    {i18nSignUp('title')}
    <SignUpForm>
      {isSent ? 
        <>
          {i18nSignUp('success')}
        </> : 
        <>
          <InputComponent label={i18nSignUp('email')} type="email" name="email"
            value={/*user.*/email} error={errors['email']} onChange={handleChange}
          />
          <InputComponent label={i18nSignUp('username')} type="text" name="username"
            value={/*user.*/username} error={errors['username']} onChange={handleChange} 
          />
          <InputComponent label={i18nSignUp('password')} type="password" name="password"
            value={/*user.*/password} error={errors['password']} onChange={handleChange}
          />
          <InputComponent label={i18nSignUp('passwordConfirm')} type="password" name="passwordConfirm"
            value={/*user.*/passwordConfirm} error={errors['passwordConfirm']} onChange={handleChange}
          />
          <Button disabled={isSigningUp} onClick={isSigningUp ? undefined : handleSubmit}>
            {i18nSignUp(isSigningUp ? 'signingup' : 'submit')}
            <ErrorText visible={!!otherErrors.length}>{otherErrors.join('\n')}</ErrorText>
          </Button>
      </>}
    </SignUpForm>
  </Container>;
}
