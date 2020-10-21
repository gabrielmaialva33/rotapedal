import styled from 'styled-components';
import media from 'styled-media-query';
import { FacebookF, Instagram, Youtube } from '@styled-icons/fa-brands';

import Tooltip from '../../../components/Tooltip';

interface LogoMenuProps {
  isTabletOrMobile: boolean;
}

export const Conteiner = styled.div``;

//* -> styled top-menu-bar
export const TopBarMenu = styled.div`
  position: fixed;
  top: 0;
  position: fixed;
  width: 100%;
  height: 107px;
  z-index: 999;


  .gree-bar {
    display: flex;
    height: 26px;
    background: #48a27e;
    overflow: hidden;

    .space {
    ${media.lessThan('huge')`
      width: 700px;
    `}

    ${media.lessThan('large')`
      width: 500px;
    `}

    ${media.lessThan('medium')`
      width: 300px;
    `}

    ${media.lessThan('small')`
      width: 100px;
    `}
  }
  }
`;

//* styled social icons
export const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;

  ul,
  li,
  a {
    display: flex;
    align-items: center;
  }

  li,
  a {
    &:first-child {
      margin-left: 0px;
    }
    margin-left: 8px;

    svg {
      transition: color 0.2s;

      &:hover {
        color: #333;
      }
    }
  }
`;

//* -> styles icons
export const FacebookIcon = styled(FacebookF)`
  color: #fff;
  height: 18px;
`;
export const InstagramIcon = styled(Instagram)`
  color: #fff;
  height: 18px;
`;
export const YoutubeIcon = styled(Youtube)`
  color: #fff;
  height: 18px;
`;

//* -> styled lang-menu
export const LangMenu = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;

  ul,
  li,
  a {
    display: flex;
    align-items: center;
  }

  li {
    &:first-child {
      margin-left: 0px;
    }
    margin-left: 5px;

    .pt {
      background: #fff;
      color: #48a27e;

      &:hover {
        color: #fff;
      }
    }

    a {
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
      color: #fff;
      text-transform: uppercase;
      font-weight: 800;
      justify-content: center;
      height: 26px;
      width: 26px;
      transition: background 0.2s;

      &:hover {
        background: #333;
      }
    }
  }
`;

//* -> styled topo-logo-menu
export const TopLogoMenu = styled.div`
  height: 81px;
  background: #333;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  margin: 0 auto;

  justify-content: space-between;

  /*space-mobile {
    ${media.lessThan('medium')`
      width: 370px;
    `}
  }*/
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;

  ul,
  li {
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;

    &:first-child {
      margin-left: 0px;
    }
    margin-left: 30px;

    a {
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
      text-transform: uppercase;
      font-weight: 700;

      transition: color 0.2s;

      &:hover {
        color: #43bc93;
      }
    }
  }
`;

//* -> signout
export const SignOut = styled(Tooltip)`
  height: 20px;

  span {
    background: rgba(255, 255, 255, 0.8);
    color: #222;
    font-weight: bold;
    width: 60px;
    text-align: center;

    &::before {
      border-color: rgba(255, 255, 255, 0.8) transparent;
    }
  }

  //* button singOut */
  > button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
      transition: color 0.2s;

      &:hover {
        color: #48a27e;
      }
    }
  }
`;

export const LogoMenu = styled.div<LogoMenuProps>`
  width: 280px;

  a {
    display: flex;
    align-items: center;
    margin-left: ${props => (props.isTabletOrMobile ? '15px' : '0px')};

    ${media.lessThan<LogoMenuProps>('small')`
      margin-left: ${props => (props.isTabletOrMobile ? '0px' : '0px')};
    `}

    img {
      display: flex;
      position: relative;
      left: -20px;
      width: 100%;
      height: auto;
      align-items: center;

      margin-top: ${props => (props.isTabletOrMobile ? '-5px' : '0px')};
      max-width: ${props => (props.isTabletOrMobile ? '240px' : '280px')};
    }
  }
`;

//* - styles responvive-menu
export const IconMenuMobile = styled.div`
  display: flex;
  align-items: center;
  margin-right: 35px;

  ${media.lessThan('small')`
    margin-right: 15px;
  `}

  button {
    display: flex;
    align-items: center;
    flex-direction: column;

    cursor: pointer;
    background: #333;
    border: none;
    background: none;
    padding: 1px 1px;
    border-radius: 4px !important;

    &:hover {
      color: #333;
      background-color: #e6e6e6;
      border-color: #adadad;
    }

    .icons-menu {
      display: flex;
      align-items: center;
      margin-top: 2px;
      margin-bottom: 2px;
      width: 35px !important;
      height: 6px !important;
      border-radius: 7px !important;
      color: #333;
      background: #48a27e;
    }
  }
`;

export const MenuMobile = styled.div``;
