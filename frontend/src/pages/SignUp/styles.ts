import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import banner from '../../assets/banner-home-blur-2.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: baseline;
  /*align-items: stretch;*/
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding: 150px 0 150px 0;
  width: 100%;
`;

//* - style box
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #333;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.9);
  border-radius: 30px;
  border: 2px solid #43bc93;
  padding: 10px 20px;
  margin-top: 100px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 20px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 36px;
      border-bottom: 4px solid #43bc93;
      color: rgba(255, 255, 255, 0.7);
      padding: 10px 0;
    }
  }

  a {
    color: #48a27e;
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#48a27e')};
    }
  }
`;

//* - style banner
export const Banner = styled.img`
  background: url(${banner}) no-repeat center center fixed;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;

  /* Set rules to fill background */
  min-width: 100%;
  min-height: 100%;

  /* Set up proportionate scaling */
  width: 100%;
  height: auto;

  /* Set up positioning */
  position: fixed;
  transform: scale(1.1);
  z-index: -1;
`;
