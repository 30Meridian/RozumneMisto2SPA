import styled from 'styled-components';
import {Row} from 'react-bootstrap';

export const ContentRow = styled(Row)`
  overflow: hidden;
  display: flex;
`;

export const ContentWrap = styled.div`
  width: 100%;
  float: left;
  overflow: hidden;

  @media (max-width: 480px) {
    overflow: visible;
  }
`;

export const ContentInner = styled.div`
  width: 100%;
  background-color: #ecf0f5;
  padding: 20px;
  padding-bottom: 200%;
  margin-bottom: -198%;

  @media (max-width: 480px) {
    padding: 10px 6px 20px 3px;
    padding-bottom: 200%;
  }
`;
