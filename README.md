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
- several HOCs and React hooks for using Firebase (documented below)

## Usage

    git clone ... my-app
    cd my-app
    npm i

You need to populate `.env.development.local` with your Google Firebase details. See `.env.example` for an example.

    npm start

### Analytics

To enable Google Analytics, uncomment the lines of code under `src/ducks/index.js` and configure events in `src/analytics.js`.

### HOCs

#### withAdminsOnly

Checks if the user has `isAdmin = true` set in the `users` Firestore collection.

#### withEditorsOnly

Checks if the user has `isEditor = true` set in the `users` Firestore collection. Useful as you cannot disable signups in Google Firebase.

### withAuthProfile

Provides the user's authentication profile (stored in Redux) to the component.

### withRedirectOnAuth

Checks if the user is logged in and if so, will redirect to the homepage. Good for a "login" area.

### withRedirectOnNotAuth

Checks if the user is logged out and if so, will redirect to the homepage. Good for a "my account" area.

### Hooks

#### `useBackupCollection(collectionName: string): [isLoading, isErrored, isSuccess, document[]]`

Backup Firestore collections by retrieving all documents and converting the document references and timestamps into meaningful strings that can be understood by `useRestoreCollection`.

#### `useRestoreCollection(collectionName: string, documents: document[]): [isLoading, isErrored, isSuccess]`

As above but takes a backup and merges it into an existing collection. It will override any existing documents.

#### `useEditDocument(collectionName): [isSaving, isSuccess, save]`

When you want to create a document. Make sure any timestamp field is a `Date` and any reference to other documents are Firestore documents (see `useViewDocumentRef`).

#### `useEditDocument(collectionName, documentId): [isSaving, isSuccess, save]`

When you want to edit a single document. It maps the references correctly and converts timestamps into `Date`s.

#### `useViewDocument(collectionName: string, documentId: string): [isLoading, isErrored, document]`

When you want to view a single document. It maps the references correctly and converts timestamps into `Date`s.

#### `useViewDocumentRef(collectionName: string, documentId: string): [firestoreDocumentObject]`

Returns the document as a reference. Useful when you want to reference other documents when saving.

#### `useSearchDocuments(collectionName: string, fieldName: string, operator: string, value: any, useRefs: boolean = true): [isLoading, isErrored, document[]]`

When you want to search all documents in a collection by a field name and operator. Optionally disable mapping document references.

## Reasons for this package

I like Google Firebase and I wanted a boilerplate to quickly create Firebase apps. None existed so I made this.
