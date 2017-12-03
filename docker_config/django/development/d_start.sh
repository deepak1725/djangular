#!/bin/bash
echo "Starting Django Scriptt"

nodejs -v && npm -v
python3 manage.py collectstatic --noinput 
python3 manage.py makemigrations
python3 manage.py migrate
npm --version
echo "Starting Node:"
npm install
gunicorn crudapi.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3

echo "Ending Gunicorn. Real"
