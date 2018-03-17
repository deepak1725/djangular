release: python manage.py makemigrations
release: python manage.py migrate
web: gunicorn crudapi.wsgi --log-file -