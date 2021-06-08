import styled from 'styled-components';

import { mediaQueries } from '../media-queries';
import { DEFAULT_THEME } from '../../theming/default-theme';
import { ITheme } from '../../theming/ITheme';

export const SignUpForm = styled.form<{ theme?: ITheme }>`
  width: auto; /* min(80vw, auto); */
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;

  @media ${mediaQueries.laptop1280} {
    padding: 20px;
  }

  @media ${mediaQueries.mobile414} {
    padding: 0px;
  }
`;

SignUpForm.defaultProps = {
  theme: DEFAULT_THEME,
};
