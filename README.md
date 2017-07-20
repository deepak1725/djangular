# Basic Crud
Angular2 App Configured with Django for Basic Signup Operations

# Create the project directory
mkdir crudapi
cd crudapi

# Create a virtualenv to isolate our package dependencies locally
virtualenv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

# Install Django and Django REST framework into the virtualenv
pip install django
pip install djangorestframework
pip install -r requirements.txt

# Set up a new project with a single application
django-admin.py startproject tutorial .  # Note the trailing '.' character
cd tutorial
django-admin.py startapp quickstart
cd ..