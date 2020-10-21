import styled, { css } from 'styled-components';
import { RiCake2Line, RiPhoneLine } from 'react-icons/ri';

export const Container = styled.div``;

export const Flex = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-left: 24px;

    > h1 {
      font-size: 26px;
      line-height: 1.25;
      font-weight: bold;
      color: #333;
    }
    > h2 {
      font-size: 18px;
      font-weight: 400;
      color: #333;
    }
  }

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    > div {
      margin-left: 0;
      margin-top: 16px;
    }
  }

  li {
    display: flex;
    align-items: center;
    margin-top: 16px;
    font-size: 14px;
    color: #333;
  }
`;

export const Avatar = styled.img`
  width: 16%;
  border-radius: 50%;

  @media (min-width: 768px) {
    width: 100%;
    margin-top: -34px;
  }
`;

export const Column = styled.ul`
  margin-top: 12px;

  li {
    display: flex;
    align-items: center;
    font-size: 14px;

    .bio {
      margin-left: 0px;
    }

    span {
      margin-left: 5px;
      color: #333;
      overflow: hidden;
    }
  }

  > li {
    margin-bottom: 14px;
  }

  li + li {
    margin-top: 10px;
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
