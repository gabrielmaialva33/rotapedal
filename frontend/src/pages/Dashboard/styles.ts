import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { RiCake2Line, RiPhoneLine } from 'react-icons/ri';

interface LeftSideProps {
  isEdit: boolean;
}

export const Container = styled.div`
  --horizontalPadding: 16px;
  --verticalPadding: 24px;

  margin-top: 107px;

  padding: var(--verticalPadding) var(--horizontalPadding);
  overflow: hidden;
  height: 100vh;
  background: #ffffff;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  margin: 0 auto;

  max-width: 1280px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const LeftSide = styled.div<LeftSideProps>`
  padding: 0 var(--horizontalPadding);

  @media (min-width: 768px) {
    width: 25%;
  }

  .edit {
    height: 32px;
    width: 100%;

    color: #333;
    /*color: #24292e;*/
    background-color: #fafbfc;
    border-color: rgba(27, 31, 35, 0.15);
    box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04),
      inset 0 1px 0 hsla(0, 0%, 100%, 0.25);
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);

    padding: 5px 16px;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid;
    border-color: rgba(27, 31, 35, 0.15);
    border-radius: 6px;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 16px;
    transition: border 0.2s;

    &:hover {
      background-color: #f3f4f6;
      transition-duration: 0.1s;
      text-decoration: none;
      transition: border 0.2s;
      border: 1px solid #333;
    }
  }

  form {
    textarea {
      padding-top: 5px 12px;

      line-height: 1.5;

      margin-bottom: 16px !important;
      width: 100% !important;

      font-size: 14px;

      padding: 5px 12px;
      font-size: 14px;
      line-height: 20px;
      color: #24292e;
      vertical-align: middle;
      background-color: #fff;
      background-repeat: no-repeat;
      background-position: right 8px center;
      border: 1px solid #333;
      border-radius: 6px;
      outline: none;
      box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
    }

    .buttons {
      margin-top: 16px;

      .save {
        color: #333;
        background: #43bc93;

        border: 1px solid #48a27e;
        border-radius: 6px;

        padding: 5px 16px;
        font-size: 14px;
        font-weight: bold;

        transition: background-color 0.2s;
        &:hover {
          background: ${shade(0.1, '#43bc93')};
        }

        margin-right: 5px;
      }

      .cancel {
        color: #333;
        background: transparent;

        border: 1px solid #ffff;
        border-radius: 6px;

        padding: 5px 16px;
        font-size: 14px;
        font-weight: bold;

        transition: border 0.2s;
        &:hover {
          border: 1px solid rgba(100, 100, 100, 0.4);
        }

        margin-left: 5px;
      }
    }
  }
`;

export const RightSide = styled.div`
  padding: 0 var(--horizontalPadding);

  @media (min-width: 768px) {
    width: 75%;
  }
`;

export const Tab = styled.div`
  background: var(--primary);

  .line {
    display: flex;
    width: 200vw;
    border-bottom: 1px solid #999;
    margin-left: -50vw;
  }

  &.mobile {
    margin-top: var(--verticalPadding);

    .content {
      margin: 0 auto;
    }

    @media (min-width: 768px) {
      display: none;
    }
  }
  &.desktop {
    display: none;

    @media (min-width: 768px) {
      display: unset;

      .wrapper {
        display: flex;
        margin: 0 auto;
        max-width: 1280px;
      }

      .offset {
        width: 25%;

        margin-right: var(--horizontalPadding);
      }
    }
  }
`;

export const TabContent = styled.div`
  display: flex;
  align-items: center;
  width: max-content;

  padding: 14px 14px;

  border-bottom: 2px solid #43bc93;

  a {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    transition: color 0.2s;

    svg {
      position: relative;
      top: 5px;

      width: 20px;
      height: 20px;
      margin-right: 4px;
      color: #333;
      transition: color 0.2s;
    }

    &:hover {
      color: #43bc93;
      svg {
        color: #43bc93;
      }
    }
  }
`;

//* -> styled icons

const iconCSS = css`
  width: 18px;
  height: 18px;
  fill: var(--icon);
  flex-shrink: 0;
`;

export const CakeIcon = styled(RiCake2Line)`
  ${iconCSS}
`;

export const PhoneIcon = styled(RiPhoneLine)`
  ${iconCSS}
`;
