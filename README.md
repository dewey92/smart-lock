# Smart Lock

Basic requirements are:
1. An Input screen to define doors and people
2. A screen to set authorization for opening the doors
3. A screen that allows users to click “open door”
4. Every door opening or rejection needs to be displayed in an events list

## Run the app

To start the app
```
git clone https://github.com/dewey92/smart-lock
yarn -- or npm i
yarn dev
```

Then open `http://localhost:1234` in your browser.

To build the app for production, simply run

`yarn build`

## Project structure
I love categorizing my app by domains as opposed to by functions. Here's my folder overall structure:

```
src/
  app/        -- app orchastration
  management/
    rooms/    -- to manage Rooms (CRUD things)
    users/    -- to manage Users (CRUD things)
  access/     -- to manage login, logout, unlocking doors, and logs
  shared/     -- shared stuff
```

You'll notice that in each domain (`rooms`, `users`, and `access`) they share some similar naming convention:

### `{domain}Models`
Your based models. Mostly contains types and interfaces. In a Javascript world, this folder can be ignored.

### `{domain}Reducer`
Contains your domain reducer along with the action creators.

### `{domain}Selector`
Selectors help you decouple the view (React components) from the data. Another benefits from using this pattern is that the views don't really care about your store structure so you can restructure the store without affecting the components.

...with some help from [reselect](https://github.com/reduxjs/reselect).

### `{domain}Saga`
All side-effects in the respected domain are listed here. If the app is using Observables, I'd normally name it as `{domain}Observables`. But it could be anything.

### `{domain}Api`
Abstracts external communication. Usually they are just http requests, but in this application I'm using local storage as my "external" persistence.