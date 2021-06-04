
import React, { useEffect, useState } from 'react';

import { Block } from './block.styled';
import { Container } from './container.styled';
import { Button } from './button.styled';
import { Input } from './input.styled';
import { Label } from './label.styled';
import { SignUpForm } from './signup-form.styled';
import { ErrorText } from './error.styled';

const en_locale = require('../localization/en.json');

const i18n = (key: string) => en_locale[`signup.${key}`] || key;

const SERVER_URL = 'http://127.0.0.1:8081';// `${config.serverHost}:${config.serverHost}`;
const POST_HEADER = {
  'Accept': 'application/json',
  'Content-type': 'application/json; charset=UTF-8'
};

export const SignUpFormComponent = () => {
  const [isSent, setIsSent] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [errors, setErrors] = useState<any>({})

  const clear = () => {
    setIsSent(false)
    setUsername('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(`Submit: \nname=${username}\ne-mail=${email}\npassword=${password}`)

    const sendData = async () => {
      const result = await fetch(`${SERVER_URL}/api/signup`, {
        method: 'POST',
        body: JSON.stringify({username, email, password}),
        headers: POST_HEADER
      });
      result
        .json()
        .then(data => {
          console.log(data);
          if (data.errors) {
            setErrors({
              ...errors,
              ...data.errors
            });
          } else {
            setIsSent(true);
            clear();
          }
        })
        .catch(e => {
          setErrors({
            ...errors,
            'unknown_server_error': e.message
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
        body: JSON.stringify({username}),
        headers: POST_HEADER
      });
      result
        .json()
        .then(data => {
          console.log(data);
          if (data.errors) {
            setErrors({
              ...errors,
              ...data.errors
            });
          }
        })
        .catch(e => {
          setErrors({
            ...errors,
            'unknown_server_error': e.message
          })
          console.error(e.message);
        });
    };

    checkUsername();
  }, [username, errors])

  return <Container>
    {i18n('title')}
    <SignUpForm>
      {isSent ? 
        <>
          {i18n('success')}
        </> : 
        <>
          <Block>
            <Label>{i18n('email')}
              <Input required type="email" name="email" placeholder={i18n('email')} value={email} onChange={(e) => setEmail(e.target.value)} />
              <ErrorText visible={errors['email']}>{errors['email']?.message}</ErrorText>
            </Label>
          </Block>
          <Block>
            <Label>{i18n('username')}
              <Input required type="text" name="username" placeholder={i18n('username')} value={username} onChange={(e) => setUsername(e.target.value)} />
              <ErrorText visible={errors['username']}>{errors['username']?.message}</ErrorText>
            </Label>
          </Block>
          <Block>
            <Label>{i18n('password')}
              <Input required type="password" name="password" placeholder={i18n('password')} value={password} onChange={(e) => setPassword(e.target.value)} />
              <ErrorText visible={errors['password']}>{errors['password']?.message}</ErrorText>
            </Label>
          </Block>
          <Block>
            <Label>{i18n('passwordConfirm')}
              <Input required type="password" name="passwordConfirm" placeholder={i18n('passwordConfirm')} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
            </Label>
          </Block>
          <Button onClick={handleSubmit}>{i18n('submit')}</Button>
      </>}
    </SignUpForm>
  </Container>;
}
