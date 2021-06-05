
import React from 'react';

import { Block } from './block.styled';
import { Input } from './input.styled';
import { Label } from './label.styled';
import { ErrorText } from '../elements/error.styled';
import { IError } from '../types/form-fields';

interface IInputComponentProps {
  name: string;
  label: string;
  type: string;
  value: string;
  error?: IError;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputComponent = ({ name, label, type, value, error, onChange}: IInputComponentProps) => (
  <Block>
    <Label isError={!!error}>{label}
      <Input required type={type} name={name} placeholder={label} value={value} isError={!!error} onChange={onChange} />
      <ErrorText visible={!!error}>{error?.message}</ErrorText>
    </Label>
  </Block>
);

