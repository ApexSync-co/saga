# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Installation

Install dependencies and run the dev server using npm (Node.js 18+ recommended):

```bash
npm install
npm run dev
```

Available scripts:

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Firebase

If you use Firebase (the project includes a `functions/` folder and `firebase.json`), install the Firebase CLI and run the emulator or deploy:

```bash
# Install Firebase CLI globally (or use npx for a one-off)
npm install -g firebase-tools

# Log in to your Firebase account
firebase login

# Start the local Firebase emulators (hosting, functions, firestore as configured)
firebase emulators:start

# Deploy hosting and functions to Firebase
firebase deploy --only hosting,functions

# Or using npx without global install
npx firebase-tools emulators:start
```
