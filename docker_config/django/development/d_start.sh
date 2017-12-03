#!/bin/bash
echo "Starting Django Scriptt"

python3 manage.py collectstatic --noinput 
python3 manage.py makemigrations
python3 manage.py migrate

gunicorn crudapi.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3

echo "Ending Gunicorn. Real"
