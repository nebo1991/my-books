# My Books

## General Info

"My Books" is a project that functions as a book club platform, where users can explore, add new books, write notes about about the books they've read.

Technologies

This project was built using the following technologies:

Vite - https://vite.dev/

React-ts - https://react.dev/

Shadcn - https://ui.shadcn.com/

Lucide - https://lucide.dev/

React-toastify - https://fkhadra.github.io/react-toastify/introduction

Tailwind CSS - https://tailwindcss.com/

Uiball Loaders - https://uiball.com/ldrs/

The backend is powered by: https://github.com/nebo1991/my-books-backend

Server hosted on: https://railway.app/

Web App hosted on: https://www.netlify.com/

Getting Started
Clone the repository to your local machine:

git clone git@github.com:nebo1991/my-books.git

Install all dependencies (make sure Node.js is installed on your machine):

npm install

Start the project:

npm run dev

Project Structure
The source folder contains three main subfolders: Pages, Components, and Assets.

Assets
This folder stores all the assets used on the webpage.

Components
This folder contains all the reusable components.

Pages
This folder contains all the page components.

## Additional:

This template provides a minimal setup to get React-ts working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
