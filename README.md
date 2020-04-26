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

### Migrations

| Operation | Command |
| --- | --- |
| list of applied migrations | `sequelize --options-path=server/options.js db:migrate:status` |
| create generic migration | `sequelize --options-path=server/options.js migration:create --name name-the-migration` |
| create model based migration | `sequelize --options-path=server/options.js model:create --name User --attributes 'name:string email:string bio:text'` |
| apply migrations | `sequelize --options-path=server/options.js db:migrate` |
| undo migration | `sequelize --options-path=server/options.js db:migrate:undo --name migration-name` |

For migration command look QueryInterface documentation: <https://sequelize.org/master/class/lib/query-interface.js~QueryInterface.html>

### Seeders

| Operation | Command |
| --- | --- |
| create a seeder | `sequelize --options-path=server/options.js seed:create --name new-seed` |
| apply all seeders | `sequelize --options-path=server/options.js db:seed:all` |
| undo all seeders | `sequelize --options-path=server/options.js db:seed:undo:all` |
| run specific seed | `sequelize --options-path=server/options.js db:seed --seed 20200301180220-recreate-categories` |

## Postgresql

### MacOS

* `brew doctor`
* `brew update`
* `brew install postgresql`
* start it with `brew services start postgresql`, stop it with `brew services stop postgresql`
* run cli with `psql` or `psql postgres` to select the user (named "postgres" in this example)

### Postgresql Commands

* `\quit` or `\q` exit
* `\list` or `\l` list databases
* `\password` change current user's password

## Local SSL

* first install the certificate server.crt included in ssl folder, using the private key server.key into you local machine
* than you will be able to run the application using `npm run dev` using SSL in localhost
* if it all works than you need to run chrome without CORS policy, following this guide <https://alfilatov.com/posts/run-chrome-without-cors/> in order to test /upload section

## FAQ

* aggiornare pacchetti => npm update
* Angular update => ng update @angular/core @angular/cli
* EADDRESSINUSE problem => killall -9 node
