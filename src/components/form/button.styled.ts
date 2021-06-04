import styled from 'styled-components';

import { DEFAULT_THEME } from '../theming/default-theme';
import { ITheme } from '../theming/ITheme';

export const Button = styled.div<{ theme?: ITheme}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${({ theme }) => `
    border: 2px solid ${theme.color.border};
    background: ${theme.button.background};
    border-radius: ${theme.button.borderRadius};
    padding: ${theme.padding.inner};
    color: ${theme.color.text};
    font-family: inherit;
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.fontSize.label};
    line-height: 120%;
  `}

  &:hover {
    cursor: pointer;
    opacity: 0.75;
  }
`

Button.defaultProps = {
  theme: DEFAULT_THEME
};