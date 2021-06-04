import styled from 'styled-components';

import { mediaQueries } from '../media-queries';
import { DEFAULT_THEME } from '../theming/default-theme';
import { ITheme } from '../theming/ITheme';

export const Container = styled.div<{ theme?: ITheme}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 90px;
  margin: auto;
  max-width: 780px;
  
  @media ${mediaQueries.laptop1440} {
    padding: 60px;
  }
  @media ${mediaQueries.laptop1280} {
    padding: 40px;
  }
  @media ${mediaQueries.tablet768} {
    padding: 20px;
  }
  @media ${mediaQueries.mobile414} {
    padding: 10px;
  }

  ${({ theme }) => `
    border: 2px solid ${theme.color.border};
    background: ${theme.color.background};
    font-family: ${theme.fontFamily};
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.fontSize.title};
  `}
`

Container.defaultProps = {
  theme: DEFAULT_THEME
};