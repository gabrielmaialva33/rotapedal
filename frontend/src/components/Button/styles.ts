import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #48a27e;
  /*background: #43bc93;*/
  height: 56px;
  border: 0px;
  border-radius: 10px;
  padding: 0 16px;
  width: 100%;
  color: #333;

  font-weight: bold;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#48a27e')};
  }
`;
