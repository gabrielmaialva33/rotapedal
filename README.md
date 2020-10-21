<h1 align="center">
  <img src=".github/images/logo.svg" height="200px" alt="RotaPedal">
</h1>
<p align="center">
  <img src="https://img.shields.io/badge/web%3F-on-00b8d3?style=for-the-badge" alt="Sistema web No" />
  <img src="https://img.shields.io/badge/server%3F-ok-00b8d3?style=for-the-badge" alt="Server Ok" />
  <img src="https://img.shields.io/badge/app mobile%3F-No-00b8d3?style=for-the-badge" alt="Aplicativo mobile No" />
  <img src="https://img.shields.io/github/license/gabrielmaialva33/rotapedal?color=00b8d3&style=for-the-badge" alt="License" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/gabrielmaialva33/rotapedal?style=for-the-badge&logo=appveyor" alt="GitHub top language" >
  <img src="https://img.shields.io/github/languages/count/gabrielmaialva33/rotapedal?style=for-the-badge&logo=appveyor" alt="GitHub language count" >
  <img src="https://img.shields.io/github/repo-size/gabrielmaialva33/rotapedal?style=for-the-badge&logo=appveyor" alt="Repository size" >
  <a href="https://github.com/gabrielmaialva33/rotapedal/commits/master">
    <img src="https://img.shields.io/github/last-commit/gabrielmaialva33/rotapedal?style=for-the-badge&logo=appveyor" alt="GitHub last commit" >
  <img src="https://img.shields.io/badge/made%20by-Maia-15c3d6?style=for-the-badge&logo=appveyor" alt="Made by Maia" >
  </a>
</p>

<br>
<p align="center">
    <a href="README.md">English</a>
    ·
    <a href="README-pt.md">Portuguese</a>
</p>

<p align="center">
  <a href="#bookmark-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-tools">Tools</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#package-installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>
</strong>
<br>

<p align="center">
    <img alt="Screens" src=".github/images/home-page.png" height="350px" />
</p>

## :bookmark: About

**RotaPedal** is a platform focused on offering services to cyclists. The project arises from a partnership with **the municipality of Cerquilho** by **[Gabriel Maia](https://github.com/gabrielmaialva33)**.

<br>

## :computer: Technologies

- **[Typescript](https://www.typescriptlang.org/)**
- **[Node.js](https://nodejs.org/)**
- **[Express](https://expressjs.com/)**
- **[TypeORM](https://typeorm.io/#/)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[ReactJS](https://reactjs.org/)**
- **[React Native](http://facebook.github.io/react-native/)**
- **[Expo](https://expo.io/)**
- **[Axios](https://github.com/axios/axios)**

<br>

## :wrench: Tools

- **[VisualStudio Code](https://code.visualstudio.com/)**
- **[Insomnia](https://insomnia.rest/)**
- **[Google Chrome](https://www.google.com/chrome/)**
- **[DataGrip](https://www.jetbrains.com/pt-br/datagrip/)**

<br>

## :package: Installation

### :heavy_check_mark: **Prerequisites**

The following software must be installed:

- **[Node.js](https://nodejs.org/en/)**
- **[Git](https://git-scm.com/)**
- **[NPM](https://www.npmjs.com/)** or **[Yarn](https://yarnpkg.com/)**
- **[Expo](https://expo.io/)**
- **[Expo App](https://play.google.com/store/apps/details?id=host.exp.exponent)**

<br>
  
### :arrow_down: **Cloning the repository**

```sh
  $ git clone https://github.com/gabrielmaialva33/rotapedal.git
```

<br>

### :arrow_forward: **Running the applications**

- :package: API

```sh
  $ cd server
  # Dependencies install.
  $ yarn # or npm install
  # Data base creation.
  $ yarn typeorm migration:run # or npm run typeorm migration:run
  # API start
  $ yarn start # or npm start
```

- :computer: Web app

```sh
  $ cd web
  # Dependencies install.
  $ yarn # or npm install
  # Running web app
  $ yarn start # or npm start
```

- :iphone: Mobile app

```sh
  $ cd mobile
  # Dependencies install.
  $ yarn # or npm install
  # Running mobile app
  $ yarn start # or npm start
```

<br>

## :memo: License

This project is under the **MIT** license. [MIT](./LICENSE) ❤️

Liked? Leave a little star to help the project ⭐
