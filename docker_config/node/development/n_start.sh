#!/bin/sh

# bower install admin-lte
echo "Starting Nodal"

echo "NPM INSTALLING"
npm install


cd users/static/ngApp/angular2
echo "Current Path"
pwd
npm install --prefix . --only=dev
npm start
echo "Ending Node Serverr"

python manage.py collectstatic --noinput 