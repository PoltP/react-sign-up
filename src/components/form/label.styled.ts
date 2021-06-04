import styled from 'styled-components';

import { DEFAULT_THEME } from '../theming/default-theme';
import { ITheme } from '../theming/ITheme';

export const Label = styled.label<{ theme?: ITheme}>`
  width: 100%;
  padding-bottom: 10px;

  ${({ theme }) => `
    color: ${theme.color.text};
    font-family: inherit;
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.fontSize.label};
    line-height: 120%;
  `}
`

Label.defaultProps = {
  theme: DEFAULT_THEME
};