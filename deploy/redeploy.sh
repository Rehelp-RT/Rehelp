#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/rehelp"

cd "$APP_DIR"
git pull origin master
npm ci
npx ng build --configuration production --output-path=public
npm run migrate
pm2 restart rehelp-web
