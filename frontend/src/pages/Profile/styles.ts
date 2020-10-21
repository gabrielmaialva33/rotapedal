import styled from 'styled-components';
import { shade } from 'polished';

import banner from '../../assets/banner-home-blur-2.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: baseline;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-items: center;

  width: 100%;

  padding: 180px 0 150px 0;

  /* @media (max-width: 768px) {
    height: 450px;
  }*/
`;

export const Box = styled.div`
  background: #333;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.9);
  border-radius: 30px;
  border: 2px solid #43bc93;

  padding: 0px 20px;

  width: 100%;
  max-width: 400px;
`;

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    margin: 20px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 36px;
      border-bottom: 2px solid #43bc93;
      color: rgba(255, 255, 255, 0.7);
      padding: 10px 0;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #43bc93;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#43bc93')};
    }
  }
`;

//* -> style banner
export const Banner = styled.div`
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
