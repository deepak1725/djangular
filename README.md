# Basic Crud         [![Build Status](https://travis-ci.org/deepak1725/basicCrud.svg?branch=develop)](https://travis-ci.org/deepak1725/basicCrud)
Angular2 App Configured with Django for Basic Signup Operations

This Project includes Django's Basic Signup Operation using latest functionalities as recommended by Django Team itself.
This is still in Beta stage, hence any issues or problems or issues faced by users are happiliy welcome and readlity solved.

Licence : You are free to download/ Clone , Destribute , modify this project in your suitable way.
Just in case, you like the efforts , drop a 'Thank you mail' to me.
This will encourage me to build the more awsome stuffs in future. :)



Steps to Install / Run:

1. Clone/ Download.
2. Install virtual environment: [VirtualWrapper](https://virtualenvwrapper.readthedocs.io/en/latest/install.html)
3. Activate virtual environment.
4. run `pip install -r requirements.txt`.
5. Install Bower (if not present already).
6. `bower install`
7. run server: python manage.py runserver
8. go to http://localhost:8000  

*** Done. :) ***

**Set Up Angular2 App:**  
  
  1. Install Angular CLI globally :[Angular CLI](https://cli.angular.io/). Check while typing `ng --version` , (> 1.x).
  2. Go to static folder `mkdir ngApp` in users app then run `ng new angular2`. This will create new Angular app in static folder of your app.
  3. Go to newly created angular2 folder, run `ng eject` : This will create **webpack.config.js** file. 
    Again run `npm install` and `npm build` after that.
  4. Now in Angular2 folder, find **_index.html_** . Move it to your templates folder .
  for ex: in my case, move it to **ngApp/Templates/ngApp/index.html**.
  5. In **webpack.config.js** file find:   
  
  Was:
  
  `new HtmlWebpackPlugin({ "template": "./src/index.html", ...`
      
  Change this to :
  
  `new HtmlWebpackPlugin({ "template": "../../../../ngApp/templates/ngApp/index.html" ...`
  or Which ever new location to **index.html**
  6. Finally in angular2 folder ,run `npm start`. to start your development server of angular2.
       
7. Visit localhost:4200 to verify it.

if during installation any problem occurs, contact project owner or raise an issue.


