import styled from 'styled-components';

import { DEFAULT_THEME } from '../theming/default-theme';
import { ITheme } from '../theming/ITheme';

export const Input = styled.input<{ theme?: ITheme}>`
  background: transparent;
  outline: none;
  height: auto;
  width: 100%;

  ${({ theme }) => `
    border: 2px solid ${theme.color.border};
    padding: ${theme.padding.inner};
    margin-top: ${theme.margin.inner};
    color: ${theme.color.subText};
    font-family: inherit;
    font-weight: ${theme.fontWeight.regular};
    font-size: ${theme.fontSize.label};
    line-height: 120%;
  `}
`

Input.defaultProps = {
  theme: DEFAULT_THEME
};