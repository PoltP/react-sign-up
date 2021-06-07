import styled from 'styled-components';

import { DEFAULT_THEME } from '../theming/default-theme';
import { ITheme } from '../theming/ITheme';
import { ErrorText } from '../elements/error.styled';

export const Button = styled.div<{ theme?: ITheme; disabled?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  user-select: none;

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

  ${({ disabled }) =>
    disabled
      ? `
    cursor: default;
    opacity: 0.5;
  `
      : `
    cursor: pointer;
    &:hover {
      opacity: 0.75;
    }
  `}

  ${ErrorText} {
    top: calc(100% + ${({ theme }) => theme.margin.inner});
  }
`;

Button.defaultProps = {
  theme: DEFAULT_THEME,
};
