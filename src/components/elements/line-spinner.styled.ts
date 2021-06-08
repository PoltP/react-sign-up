import styled from 'styled-components';

import { DEFAULT_THEME } from '../../theming/default-theme';
import { ITheme } from '../../theming/ITheme';

export const LineSpinner = styled.div<{ theme?: ITheme; isError?: boolean }>`
  position: relative;
  width: 100%;

  &:before,
  &:after {
    position: absolute;
    content: '';
    top: 0;
    height: 3px;
    animation: first-line 1.5s ease infinite;
    ${({ theme }) => `
      background-color: ${theme.color.spinner};
      box-shadow: 0px 0px 1px 0 ${theme.color.border};
    `}
  }
  &:before {
  }
  &:after {
    animation-name: second-line;
    animation-delay: 0.2s;
  }

  @keyframes first-line {
    from {
      left: 0;
      width: 16%;
    }
    to {
      left: 96%;
      width: 4%;
    }
  }
  @keyframes second-line {
    from {
      left: 8%;
      width: 8%;
    }
    to {
      left: 94%;
      width: 2%;
    }
  }
`;

LineSpinner.defaultProps = {
  theme: DEFAULT_THEME,
};
