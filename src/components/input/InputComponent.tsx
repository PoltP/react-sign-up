import React, { useState } from 'react';

import { Block } from './block.styled';
import { Input } from './input.styled';
import { Label } from './label.styled';
import { ErrorText } from '../elements/error.styled';
import { LineSpinner } from '../elements/line-spinner.styled';
import type { IError, KnownField } from '../../types/form-fields';

interface IInputComponentProps {
  name: KnownField;
  label: string;
  type: string;
  value: string;
  error?: IError;
  isLoading?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValidate: (field: KnownField) => void;
}

export const InputComponent = ({
  name,
  label,
  type,
  value,
  error,
  isLoading,
  onChange,
  onValidate
}: IInputComponentProps) => {
  const [focused, setFocused] = useState(false);
  const onBlur = () => {
    setFocused(false);
    onValidate && onValidate(name);
  }
  return (
    <Block>
      <Label isError={!!error}>
        {label}
        <Input
          required
          type={type}
          name={name}
          placeholder={label}
          value={value}
          isError={!focused && !!error}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={onBlur}
        />
        {isLoading && <LineSpinner />}
        <ErrorText visible={!!error}>{error?.message}</ErrorText>
      </Label>
    </Block>
  );
}
