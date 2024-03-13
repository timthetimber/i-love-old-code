![Banner](https://github.com/timthetimber/i-love-old-code/blob/main/readme-resources/I-Love-Old-Code-Banner.png?raw=true)

# I-Love-Old-Code

I-Love-Old-Code is a simple code snippet manager. It allows you to store and revisit code snippets, assign tags to them, save them to a folder, and the best part is that the code snippets are syntax highlighted, thanks to [monaco-editor](https://www.npmjs.com/package/@monaco-editor/react), which is the backbone of Visual Studio Code. It also includes an automatic code language detection feature called [vscode-languagedetection](https://www.npmjs.com/package/@vscode/vscode-languagedetection).

Feel free to try out "I-Love-Old-Code" [here](https://i-love-old-code.vercel.app/).

## Table of Contents

- [Installation](#installation)
- [Technical Debt](#technical-debt)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository.
2. Install all the NPM packages: `npm install`.
3. Start the application in development mode: `npm run dev`.

## Technical Debt

**The project currently only saves the code snippets in a session.** \
Please feel free to look at the contribution page if you would like to add support for a database.
Checkout the `lib/data.context.tsx` file to find the implementation of the current session storage.
I have already abstracted the layer, so it should be relatively easy to add support for a database.

This project is built with the following technologies:

### Next.js

[Next.js](https://github.com/vercel/next.js) enables you to create full-stack web applications by extending the latest React features and integrating powerful Rust-based JavaScript tooling for the fastest builds.

### Shadcn

[Shadcn](https://github.com/shadcn-ui/ui) is a library containing many UI components.

### Monaco Editor

[Monaco Editor](https://github.com/microsoft/monaco-editor) is a powerful and open-source code editor for the web. I used this editor in the project to make the code snippets look visually appealing and not just plain black text on a white screen. It also provides intellisense, allowing you to code your snippets directly in the UI.

## Motivation

With this project, I aimed to create a super simple code snippet manager that I would personally use. The manager serves as a knowledge database, allowing programmers to store and easily access their favorite code snippets.

I also wanted to gain experience with [Shadcn](https://github.com/shadcn-ui/ui) as I was impressed by it after watching a video. It turned out to be just as nice as I expected. I highly recommend giving it a try.

## Features for the Future

First and foremost, please note that this is a hobby project, so there are no guarantees for future changes. If I find the time and motivation, I will continue working on it. However, please feel free to contribute or open issues.

Feature list:

- [ ] Adding a search bar
- [ ] Adding filters
- [ ] Database support (MySQL?)
- [ ] More customization options (e.g., setting for preferred theme for the Monaco Editor)
- [ ] Fixing responsiveness on mobile devices

## Contributing

See the [contribution guide](contributing.md) and join our amazing list of [contributors](https://github.com/timthetimber/i-love-old-code/graphs/contributors)!

## License

This project is licensed under the [MIT License](LICENSE).
