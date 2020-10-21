import React from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../../hooks/auth';

import logo from '../../../assets/logo-white.svg';

import {
  Conteiner,
  TopBarMenu,
  SocialIcons,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LangMenu,
  TopLogoMenu,
  Nav,
  LogoMenu,
  IconMenuMobile,
  SignOut,
} from './styles';

const Default: React.FC = ({ children }) => {
  const { user, signOut } = useAuth();

  return (
    <Conteiner>
      <TopBarMenu>
        <div className="gree-bar">
          <SocialIcons>
            <ul>
              <li>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                </a>
              </li>
              <MediaQuery minWidth={769}>
                <li>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <YoutubeIcon />
                  </a>
                </li>
              </MediaQuery>
            </ul>
          </SocialIcons>
          <div className="space" />
          <LangMenu>
            <ul>
              <li>
                <a href="http://" className="pt">
                  pt
                </a>
              </li>
              <li>
                <a href="http://">en</a>
              </li>
              <li>
                <a href="http://">es</a>
              </li>
            </ul>
          </LangMenu>
        </div>
        <TopLogoMenu>
          <MediaQuery minWidth={769}>
            <Nav>
              <ul>
                <li>
                  <a href="http://">Rotas </a>
                </li>
                <li>
                  <a href="http://">Experiências </a>
                </li>
                <li>
                  <a href="http://">Apoiadores</a>
                </li>
              </ul>
            </Nav>
          </MediaQuery>
          <LogoMenu isTabletOrMobile={useMediaQuery({ maxWidth: 768 })}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </LogoMenu>
          <MediaQuery maxWidth={768}>
            <div className="space-mobile" />
            <IconMenuMobile>
              <button
                type="button"
                className="navbar-toggle"
                data-target=".navbar-main-navigation"
                data-toggle="collapse"
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onClick={() => {}}
              >
                <div className="icons-menu" />
                <div className="icons-menu" />
                <div className="icons-menu" />
              </button>
            </IconMenuMobile>
          </MediaQuery>
          <MediaQuery minWidth={769}>
            <Nav>
              <ul>
                <li>
                  <a href="http://localhost:3000/#quemSomos">Quem Somos </a>
                </li>
                <li>
                  <a href="http://">Contato</a>
                </li>
                <li>
                  {user ? (
                    <SignOut title="Sair">
                      <button type="button" onClick={signOut}>
                        <FiPower />
                      </button>
                    </SignOut>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
              </ul>
            </Nav>
          </MediaQuery>
        </TopLogoMenu>
      </TopBarMenu>
      {children}
    </Conteiner>
  );
};

export default Default;
