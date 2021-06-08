import styled from 'styled-components';

import { DEFAULT_THEME } from '../../theming/default-theme';
import { ITheme } from '../../theming/ITheme';

export const Input = styled.input<{ theme?: ITheme; isError?: boolean }>`
  background: transparent;
  outline: none;
  height: auto;
  width: 100%;

  ${({ theme, isError }) => `
    border: 2px solid ${theme.color.border};
    padding: ${theme.padding.inner};
    margin-top: ${theme.margin.inner};
    color: ${isError ? theme.color.error : theme.color.subText};
    font-family: inherit;
    font-weight: ${theme.fontWeight.regular};
    font-size: ${theme.fontSize.label};
    line-height: 120%;

    &::placeholder {
      ${isError ? `color: ${theme.color.error}` : ''};
    }

    &:-webkit-autofill::first-line {
      font-size: ${theme.fontSize.label};
    }
    &:-webkit-autofill {
      -webkit-text-fill-color: ${isError ? theme.color.error : theme.color.subText} !important;
    }
  `}
`;

Input.defaultProps = {
  theme: DEFAULT_THEME,
};
