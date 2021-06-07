import styled from 'styled-components';

import { DEFAULT_THEME } from '../theming/default-theme';
import { ITheme } from '../theming/ITheme';

export const Spinner = styled.div<{ theme?: ITheme; isError?: boolean }>`
  animation: spin 1s ease-in-out infinite;
  display: inline-block;
  border-radius: 50%;
  position: absolute;

  ${({ theme }) => `
    right: ${theme.fontSize.label};
    top: calc(50% - ${theme.fontSize.label} / 2);
    width: ${theme.fontSize.label};
    height: ${theme.fontSize.label};
    border: 3px solid rgba(58, 58, 58, .3);
    border-top-color: ${theme.color.border};
  `}

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

Spinner.defaultProps = {
  theme: DEFAULT_THEME,
};
