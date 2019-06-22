# react-redux-firebase-boilerplate

A boilerplate based off Create React App that includes:

- React
- Redux
- Google Firebase (connected to Redux)
- React Router (connected to Redux)
- Google Analytics (disabled by default)
- Prettier

After install you will have a web app that comes with:

- home, login, logout, my account views
- basic page header and footer
- dummy Redux reducer (`src/ducks/app.js`)
- several HOCs and React hooks for using Firebase

## Usage

    git clone ... my-app
    cd my-app
    npm i

You need to populate `.env.development.local` with your Google Firebase details. See `.env.example` for an example.

    npm start

### Analytics

To enable Google Analytics, uncomment the lines of code under `src/ducks/index.js` and configure events in `src/analytics.js`.

### HOCs

todo

### Hooks

todo

## Reasons for this package

I like Google Firebase and I wanted a boilerplate to quickly create Firebase apps. None existed so I made this.
