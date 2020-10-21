import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  color: rgba(255, 255, 255, 0.3);

  display: flex;
  align-items: center;
  transition: width .3s;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      /* border-color: #c53030;*/
      border-bottom: 2px solid #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #48a27e;
      /*border-color: #48a27e;*/
      border-bottom: 2px solid #48a27e;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #48a27e;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: rgba(255, 255, 255, 0.7);
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
