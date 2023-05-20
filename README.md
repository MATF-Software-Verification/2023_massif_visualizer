# 2023_massif_visualizer

Welcome to the Massif Visualizer repository. The goal of this project is to create a desktop app that will visualize the output of the [Massif](https://valgrind.org/docs/manual/ms-manual.html) tool. The app will be built using [Electron](https://www.electronjs.org/) and [React](https://reactjs.org/).

## Tech stack

- [Electron](https://www.electronjs.org/) - a framework for building cross-platform desktop apps with JavaScript, HTML, and CSS. Used to build the desktop app.
- [React](https://reactjs.org/) - a JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/) - a build tool that serves your code via native ES Module imports during development and bundles it with Rollup for production. Used to speed up development and reduce build times.
- [TypeScript](https://www.typescriptlang.org/) - a typed superset of JavaScript that compiles to plain JavaScript. Used to add static typing to JavaScript and increase code quality, readability and maintainability.
- [TailwindCSS](https://tailwindcss.com/) - a utility-first CSS framework for rapidly building custom designs. Used to speed up development and reduce the amount of code needed to build the UI.
- [ESLint](https://eslint.org/) - a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Used to enforce code quality and consistency.
- [Prettier](https://prettier.io/) - an opinionated code formatter. Used to enforce code formatting and consistency.

## Installation

1. Clone the repository: `git clone https://github.com/MATF-Software-Verification/2023_massif_visualizer.git`
2. Open the project folder with VSCode (or your preferred editor) and open the integrated terminal
3. Install (or update) Python:
   - On windows, download and install the latest version of Python from [here](https://www.python.org/downloads/).
   - On linux, run the following commands:
   - Install python: `sudo apt install python3`
   - Install pip: `sudo apt install python3-pip`
4. Install (or update) Node and NPM:
   - On windows, download and install the latest version of Node from [here](https://nodejs.org/en/download/).
   - On linux, run the following commands:
   - Install curl: `sudo apt install curl`
   - Install nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
   - Install node: `nvm install node`
   - Install npm: `nvm install-latest-npm`
5. Install pnpm: `npm i -g pnpm`
6. Install dependencies: `pnpm i`
7. Install msparser: `pip install msparser`

## Development

To start the development server, run `pnpm run dev`. This will start the development server on port 3000. The server will automatically reload when you make changes to the code.

It's recommended to use [VSCode](https://code.visualstudio.com/) as your editor since it's configured to use the same settings as the project inside `.vscode/settings.json`. It's also recommended to use [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint) extensions for VSCode for automatic code formatting and linting on file save. You don't need any additional setup since the extensions are configured to use the same settings as the ones used by the project inside `.vscode/settings.json`.

**NOTE:** I have setup alias imports for the `src` folder which makes imports shorter and easier to read. This means that you can import files from these folders using the `@` alias. For example, if you are in a deeply nested folder and you want to import component named `Component` from the `components` folder, you can do it like this: `import Component from '@/components/Component'`. This is the same as doing `import Component from '../../../components/Component'`.
