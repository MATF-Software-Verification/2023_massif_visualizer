# 2023_massif_visualizer

## Project Description

Welcome to the Massif Visualizer repository. The goal of this project is to create a desktop app that will visualize the output of the [Massif](https://valgrind.org/docs/manual/ms-manual.html) tool. The app will be built using [Electron](https://www.electronjs.org/) and [React](https://reactjs.org/).

People working on this project:
Pavle Cvejović, 1068/2022
Viktor Novaković, 1062/2022

Course professor: Milena Vujošević-Janičić
Course assistant: Ivan Ristović

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
3. Install the GNU compiler and debugger collection: `sudo apt install build-essential`
4. Install Valgrind: `sudo apt install valgrind`
5. Install (or update) Python: `sudo apt install python3`
6. Install (or update) pip: `sudo apt install python3-pip`
7. Install (or update) Node and NPM:
   - Install curl: `sudo apt install curl`
   - Install nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
   - Install node: `nvm install node`
   - Install npm: `nvm install-latest-npm`
8. Install pnpm: `npm i -g pnpm`
9. Install dependencies: `pnpm i`
10. Install msparser: `pip install msparser`

## Development

To start the development server, run `pnpm run dev`. This will start the development server on port 3000. The server will automatically reload when you make changes to the code.

It's recommended to use [VSCode](https://code.visualstudio.com/) as your editor since it's configured to use the same settings as the project inside `.vscode/settings.json`. It's also recommended to use [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint) extensions for VSCode for automatic code formatting and linting on file save. You don't need any additional setup since the extensions are configured to use the same settings as the ones used by the project inside `.vscode/settings.json`.

**NOTE:** I have setup alias imports for the `src` folder which makes imports shorter and easier to read. This means that you can import files from these folders using the `@` alias. For example, if you are in a deeply nested folder and you want to import component named `Component` from the `components` folder, you can do it like this: `import Component from '@/components/Component'`. This is the same as doing `import Component from '../../../components/Component'`.

## Usage Example

| ![Screenshot1](https://github.com/MATF-Software-Verification/2023_massif_visualizer/assets/76535188/6bf382f5-8ce2-44bd-8777-79f3c24906cd) | ![Screenshot2](https://github.com/MATF-Software-Verification/2023_massif_visualizer/assets/76535188/356b80a0-3067-4d12-a8c1-24d2f6fd4640) |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |

### Single C/C++ File Analysis

1. Choose the option to upload a single C or C++ source file.
2. Select the desired file by the file picker.
3. Click on the `Inspect` button to compile the file and execute Massif.
4. The Massif tool will collect memory usage data during execution.
5. The application will parse and format the Massif output, generating a graph on the Stats screen.
6. On the Stats screen, the x-axis represents snapshots of the file, and the y-axis represents memory usage in bytes.
7. Use the snapshot range slider to focus on specific sections of the execution.
8. Select a snapshot that has a location in the code as a label to view the corresponding code in the code editor on the side.
9. Analyze the graph and code to identify memory-related issues and optimize your program.

![Screenshot3](https://github.com/MATF-Software-Verification/2023_massif_visualizer/assets/76535188/c709d88b-3fc3-4c1f-af3b-bb170c045226)

### Multiple Massif Files Comparison

1. Choose the option to upload Massif file(s).
2. Select the desired file(s) by the file picker.
3. Click on the `Compare` button to load and process the files.
4. The application will generate a graph on the Stats screen, representing memory usage for each Massif file.
5. On the Stats screen, each Massif file will have a separate line in the graph.
6. Select a specific Massif file from the dropdown to view its snapshots.
7. Use the snapshot range slider to focus on specific sections of the execution for all files.

![Screenshot4](https://github.com/MATF-Software-Verification/2023_massif_visualizer/assets/76535188/a1d8100a-d91a-4c40-b04b-1d439f41d536)

By utilizing this application, you can gain valuable insights into memory usage patterns, detect memory leaks, and optimize your C or C++ programs for better performance. Happy debugging!

## Test samples

In the directory `samples` you can find some test samples for the application. You can use the ones inside the subdirectory `c-cpp` to test the application with single C/C++ files, and the ones inside the subdirectory `massif` to test the application with multiple Massif files. Structure of the directory is shown below:

```
samples
├── c-cpp
│   ├── 1.c
│   └── 1.cpp
└── massif
    ├── massif.out.32406
    ├── massif.out.huge
    └── massif.out.kate2
    └── massif.out.kate3
    └── massif.out.ktorrent
    └── massif.out.stack
```
