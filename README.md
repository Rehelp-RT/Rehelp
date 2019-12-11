# RehelpWeb

## Quick running app

* `npm install`
* `createdb` (first time only)
* `npm run dev`
* navigate to `http://localhost:4200`

## Technology Stack

* NodeJs
* Express Framework
* Angular
* Postgresql
* Sequelize

## Sequelize

### create a new model

* `sequelize model:create --name User --attributes 'name:string email:string bio:text'`
* `sequelize db:migrate`

## Postgresql

### MacOS

* `brew doctor`
* `brew update`
* `brew install postgresql`
* start it with `brew services start postgresql`, stop it with `brew services stop postgresql`
* run cli with `psql` or `psql postgres` to select the user (named "postgres" in this example)

## Postgresql Commands

* `\quit` or `\q` exit
* `\list` or `\l` list databases
* `\password` change current user's password
