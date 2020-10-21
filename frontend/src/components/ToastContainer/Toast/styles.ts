import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

export interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasdescription: number;
}

const toastTypeVariations = {
  info: css`
    background: rgba(225, 255, 255, 0.6);
    color: #3172b7;
    /*border: 1px solid #333; */

    p {
      color: #333;
      font-weight: bold;
    }
  `,
  success: css`
    background: rgba(230, 255, 230, 0.6);
    color: #2e656a;
    /*border: 1px solid #333; */

    p {
      color: #333;
      font-weight: bold;
    }
  `,
  error: css`
    background: rgba(255, 255, 255, 0.6);
    color: #c53030;

    p {
      color: #333;
      font-weight: bold;
    }
    /*border: 1px solid #333; */
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  strong {
    font-weight: bold;
  }

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
