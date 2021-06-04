import styled from 'styled-components';

import { DEFAULT_THEME } from '../theming/default-theme';
import { ITheme } from '../theming/ITheme';

export const ErrorText = styled.div<{ theme?: ITheme, visible?: boolean}>`
  width: 100%;
  position: absolute;
  left: 0;

  ${({ theme }) => `
    top: calc(100% - ${theme.margin.inner});
    color: ${theme.color.error};
    font-family: inherit;
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.fontSize.label};
    line-height: 120%;
  `}

  ${({ visible }) => `
    visibility: ${visible ? 'visible' : 'hidden'};
  `}
`

ErrorText.defaultProps = {
  theme: DEFAULT_THEME
};