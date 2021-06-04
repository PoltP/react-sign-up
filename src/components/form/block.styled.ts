import styled from 'styled-components';

import { mediaQueries } from '../media-queries';

export const Block = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;

  margin-bottom: 30px;
  @media ${mediaQueries.laptop1440} {
     margin-bottom: 25px;
  }
  @media ${mediaQueries.tablet768} {
    margin-bottom: 15px;
  }
  @media ${mediaQueries.mobile414} {
    margin-bottom: 10px;
  }
`