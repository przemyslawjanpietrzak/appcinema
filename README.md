To install app

$ npm install
$ mysql
> create database appcinema;
(change user, password and port in ./config/env/developmen.json5) // for your mysql db
(exit mysql ctrl+d)
node generateData.js  // optionally
$ npm start

run localhost:3000