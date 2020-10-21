import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface FieldSetProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  transition: width 0.3s;
`;

export const Fieldset = styled.fieldset<FieldSetProps>`
  padding: 0;
  border: 0;

  width: 100%;
  color: rgba(255, 255, 255, 0.3);

  input {
    color: rgba(255, 255, 255, 0.7);
    border: 0;
    background: transparent;
    width: 100%;

    padding: 10px 0 10px 40px;

    .placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  input + label {
    position: relative;
    display: block;
    text-align: left;
    /*padding: 8px 0 8px 0;*/
    /*font-size: 14px;*/
    /*text-transform: uppercase;*/
    /*letter-spacing: 0.0875em;*/
    font-weight: 600;

    &::before,
    &::after {
      position: absolute;
      top: -1px;
      left: 10px;
      content: '';
      width: 90%;
      height: 1px;
    }

    &::before {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &::after {
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
      /*background-color: #48a27e;*/
      background-color: #43bc93;

      height: 2px;
    }

    span {
      position: relative;
      color: rgba(255, 255, 255, 0.2);
      transition: color 300ms cubic-bezier(0.215, 0.61, 0.355, 1);

      top: -70px;
      left: 10px;

      &::after {
        content: attr(data-text);
        position: absolute;
        overflow: hidden;

        top: 0px;
        left: 0px;

        transform: scaleX(1);
        white-space: nowrap;
       /*color: #48a27e;*/
        color: #43bc93;

        background-image: linear-gradient(
          to right,
          #43bc93 50%,
          rgba(255, 255, 255, 0) 0%
        );
        background-position: 100% 50%;
        background-size: 200%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        backface-visibility: hidden;
        perspective: 1000;
        transform: translateZ(0);

        transition: background-position 300ms
          cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }
  }

  ${props =>
    props.isErrored &&
    css`
      /* border-color: #c53030;*/
      /*  border-bottom: 2px solid #c53030;*/
      color: #c53030;
    `}

  ${props =>
    props.isFilled &&
    css`
      /*color: #48a27e;*/
      color: #43bc93;
    `}

  ${props =>
    props.isFocused &&
    css`
      /*color: #48a27e;*/
      color: #43bc93;
    `}

  svg {
    position: relative;

    top: 35px;
    left: -150px;
  }

  input:focus {
    color: rgba(255, 255, 255, 0.7);

    svg {
      /*color: #48a27e;*/
      color: #43bc93;
    }

    & + label {
      &::after {
        transform: scaleX(1);
        transform-origin: left;
      }



      span::after {
        top: 0px;
        left: 0px;
        /*background-image: linear-gradient(
          to right,
          #48a27e 50%,
          rgba(255, 255, 255, 0) 0%
        );*/
        background-image: linear-gradient(
          to right,
          #43bc93 50%,
          rgba(255, 255, 255, 0) 0%
        );
        background-position: 0% 50%;
      }
    }
  }
`;

export const Error = styled(Tooltip)`
  width: 20px;
  height: 20px;

  top: -55px;
  left: 290px;

  svg {
    position: relative;
    top: 0px;
    left: 0px;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
