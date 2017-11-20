#!/bin/bash

# Start Gunicorn processes
# echo "Starting Gunicornnn. Real"
# exec python manage.py makemigrations && python manage.py migrate
# && echo "Making Migrationss."
# echo "Starting Migrationss."
python manage.py collectstatic --noinput 
python manage.py makemigrations
python manage.py migrate
gunicorn crudapi.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3

echo "Ending Gunicornnn. Real"
