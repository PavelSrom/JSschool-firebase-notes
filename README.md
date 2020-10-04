This is a tiny firebase app for CRUD operations with notes
Created as a school project submission

## Features

- All CRUD operations with Firebase supported
- Allowing for searching and filtering notes
- Bootstrap used to build the UI

## Folder structure

- `index.html` - basic HTML needed to build this
- `api.js` - 'state' - data fetching methods, state updates, tracking loading and error states (not used in this app)
- `ui.js` - 'ui' - pointers to DOM elements, a `renderNotes` method to update the UI based on current state
- `app.js` - attaching event listeners and running the app from an IIFE

## Author's comments

- I tried to separate the state from the UI as much as possible for two reasons - 1) separation of concerns, 2) to show why JS frameworks are a godsend
- I have to admit I sometimes had a hard time syncing all state with UI, and that there are more efficient methods of updating the UI than just `renderNotes`. I did not really want to bother with writing them when essentially all I needed was just one that receives the current state and re-renders the UI.
- I am sure writing code using some JS patterns would solve the problem significantly, but at some point you just have to grab a framework
