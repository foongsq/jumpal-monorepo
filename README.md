# Jumpal
A tracking app for jump rope athletes to track their speed scores, personal bests, and freestyle tricks they want to learn.

![Jumpal Banner](./docs/images/banner.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Frontend Project setup

- Add firebase configurations in `/src/data/firebase/config.js` according to `config.js sample` file
- Add service account credentials in `/src/data/firebase/serviceAccount.json` according to `serviceAccount.json sample` file
- Run command `export GOOGLE_APPLICATION_CREDENTIALS="<ABSOLUTE PATH TO>/serviceAccount.json"` in the terminal to set credentials as environment variable for Firebase Admin to detect.
- In `apps/frontend`, `npm install` to install dependencies
- In `apps/frontend`, `npm run dev` to start up app on localhost

## Documentation
Documentation is found at [project wiki](https://github.com/foongsq/jumpal-monorepo/wiki)
