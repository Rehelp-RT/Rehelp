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

Use sequalize command `sequelize --options-path=server/options.js *` (or `npm run sequelize *` in certain cases still works) and substitute the * with one of the following command:

| Operation | Command |
| --- | --- |
| list of applied migrations | `db:migrate:status` |
| create generic migration | `migration:create --name name-the-migration` |
| create model based migration | `model:create --name User --attributes 'name:string email:string bio:text'` |
| apply migrations | `db:migrate` |
| apply all seeds | `db:seed:all` |
| undo all seeds | `db:seed:undo:all` |

For migration command look QueryInterface documentation: <https://sequelize.org/master/class/lib/query-interface.js~QueryInterface.html>

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
