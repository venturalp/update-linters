# Update linters

## Purpose

With the intention to provide a single source of linters patterns for, initially, React projects, and to be able to update this patterns when it's necessary.

Using [create-react-app](https://github.com/facebook/create-react-app) template option with the [cra-template-venturalp](https://www.npmjs.com/package/cra-template-venturalp) one can already run a package.json script `updateLinter` with the default options, but nothing stops you from change it to use some options (listed bellow)

### Options

| Option            | Description                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| --VSCODE, --vsc   | `true` by default:<br>this option indicates to use `.vscode` settings into the update process        |
| --ESLINT, --esl   | `true` by default:<br>this option indicates to use `.eslintrc.js` settings into the update process   |
| --PRETTIER, --ptr | `true` by default:<br>this option indicates to use `.prettierrc.js` settings into the update process |
| --EDITOR, --edt   | `false` by default:<br>this option indicates to use `.editorconfig` settings into the update process |
| --BABEL, --babel  | `true` by default:<br>this option indicates to use `.babelrc` settings into the update process       |

### Usage

On terminal, go to your project path, then run:

`npx @venturalp/update-linters [OPTIONS]`

All the `devDependencies` will be placed into your `package.json` if any of them are already there, they will be replaced, but none of them will be removed, don’t worry.
