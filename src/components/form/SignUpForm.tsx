
import React, { useState } from 'react';

import { Block } from './block.styled';
import { Container } from './container.styled';
import { Button } from './button.styled';
import { Input } from './input.styled';
import { Label } from './label.styled';
import { SignUpForm } from './signup-form.styled';

const en_locale = require('../localization/en.json');

const i18n = (key: string) => en_locale[`signup.${key}`] || key;

export const SignUpFormComponent = () => {
  const [isSent, setIsSent] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const clear = () => {
    setIsSent(false)
    setUsername('')
    setEmail('')
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(`Submit: \nname=${username}\ne-mail=${email}\npassword=${password}`)
    setIsSent(true)
    clear()
  }

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
            </Label>
          </Block>
          <Block>
            <Label>{i18n('username')}
              <Input required type="text" name="username" placeholder={i18n('username')} value={username} onChange={(e) => setUsername(e.target.value)} />
            </Label>
          </Block>
          <Block>
            <Label>{i18n('password')}
              <Input required type="password" name="password" placeholder={i18n('password')} value={password} onChange={(e) => setPassword(e.target.value)} />
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
