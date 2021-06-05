
import React, { useEffect, useState } from 'react';

import { Block } from './block.styled';
import { Container } from './container.styled';
import { Button } from './button.styled';
import { Input } from './input.styled';
import { Label } from './label.styled';
import { SignUpForm } from './signup-form.styled';
import { ErrorText } from './error.styled';
import { i18nCreator } from '../localization/i18n';
import { User, Errors } from '../types/form-fields';
import { signUpValidator } from '../validation/sign-up-validator';

const i18nSignUp = i18nCreator('signup');

const SERVER_URL = 'http://127.0.0.1:8081';// `${config.serverHost}:${config.serverHost}`;
const POST_HEADER = {
  'Accept': 'application/json',
  'Content-type': 'application/json; charset=UTF-8'
};

export const SignUpFormComponent = () => {
  const [isSent, setIsSent] = useState(false);

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
    const field: User = event.target.name as User;
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

    console.log(`SignUp Submit: \nname=${user.username}\ne-mail=${user.email}\npassword=${user.password}`);
    const sendData = async () => {
      const result = await fetch(`${SERVER_URL}/api/signup`, {
        method: 'POST',
        body: JSON.stringify({username: user.username, email: user.email, password: user.password}),
        headers: POST_HEADER
      });
      result
        .json()
        .then(data => {
          console.log(`SignUp Response: ${JSON.stringify(data)}`);
          if (data.errors) {
            setErrors({
              ...errors,
              ...data.errors
            });
          } else {
            clear();
            setIsSent(true);
          }
        })
        .catch(e => {
          setErrors({
            ...errors,
            'unknown': {message: e.message}
          })
          console.error(e.message);
        });
    };

    sendData();
  }

  useEffect(() => {
    const checkUsername = async () => {
      const result = await fetch(`${SERVER_URL}/api/check`, {
        method: 'POST',
        body: JSON.stringify({/*username: user.*/username}),
        headers: POST_HEADER
      });
      result
        .json()
        .then(data => {
          console.log(`Check Response: ${JSON.stringify(data)}`);
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
          console.error(e.message);
        });
    };

    /*user.*/username && checkUsername();
  }, [/*user.*/username])

  return <Container>
    {i18nSignUp('title')}
    <SignUpForm>
      {isSent ? 
        <>
          {i18nSignUp('success')}
        </> : 
        <>
          <Block>
            <Label>{i18nSignUp('email')}
              <Input required type="email" name="email" placeholder={i18nSignUp('email')} value={/*user.*/email} onChange={handleChange} />
              <ErrorText visible={!!errors['email']}>{errors['email']?.message}</ErrorText>
            </Label>
          </Block>
          <Block>
            <Label>{i18nSignUp('username')}
              <Input required type="text" name="username" placeholder={i18nSignUp('username')} value={/*user.*/username} onChange={handleChange} />
              <ErrorText visible={!!errors['username']}>{errors['username']?.message}</ErrorText>
            </Label>
          </Block>
          <Block>
            <Label>{i18nSignUp('password')}
              <Input required type="password" name="password" placeholder={i18nSignUp('password')} value={/*user.*/password} onChange={handleChange} />
              <ErrorText visible={!!errors['password']}>{errors['password']?.message}</ErrorText>
            </Label>
          </Block>
          <Block>
            <Label>{i18nSignUp('passwordConfirm')}
              <Input required type="password" name="passwordConfirm" placeholder={i18nSignUp('passwordConfirm')} value={/*user.*/passwordConfirm} onChange={handleChange} />
              <ErrorText visible={!!errors['passwordConfirm']}>{errors['passwordConfirm']?.message}</ErrorText>
            </Label>
          </Block>
          <Button onClick={handleSubmit}>{i18nSignUp('submit')}</Button>
      </>}
    </SignUpForm>
  </Container>;
}
