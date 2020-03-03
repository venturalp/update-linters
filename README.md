# Update linters

## Purpose

With the intention to provide a single source of linters patterns for, initially, React projects, and to be able to update this patterns when it's necessary.

Using [create-react-app](https://github.com/facebook/create-react-app) template option with the [cra-template-venturalp](https://www.npmjs.com/package/cra-template-venturalp) one can already run a package.json script `updateLinter` with the default options, but nothing stops you from change it to use some options (listed bellow)

### Options

| Option<sup>1</sup> | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| --VSCODE, --vsc    | `false` by default:<br>this option indicates to use `.vscode` settings into the update process       |
| --ESLINT, --esl    | `true` by default:<br>this option indicates to use `.eslintrc.js` settings into the update process   |
| --PRETTIER, --ptr  | `true` by default:<br>this option indicates to use `.prettierrc.js` settings into the update process |
| --EDITOR, --edt    | `false` by default:<br>this option indicates to use `.editorconfig` settings into the update process |
| --BABEL, --babel   | `true` by default:<br>this option indicates to use `.babelrc` settings into the update process       |

<sup>1</sup>: Use `--no` prefix to set an option as false. E.g.: `npx @venturalp/update-linters --no-ESLINT`

### Attention

All the `devDependencies` will be placed into your `package.json` if any of them are already there, they will be replaced, but none of them will be removed, don’t worry.

You may loose some of your `eslint` settings, depending on what you got as your current `eslint` settings

### Usage

On terminal, go to your project path, then run:

`npx @venturalp/update-linters [OPTIONS]`

## TODO

(feel free to do a pull request)

- Option to define what kinds of dependencies it should install
- Option to define a _mainSource_/_template_ to use instead of its own
- Option to use a third party library to install IDE extensions (VSCode, VIM, WebStorm, IntelliJ, Atom)
