# README #

## ANNOTATION WEB GAME
This is web service to detect object in images which is used in Image process.
This project is built with Django and React



### Preview
![Relevance feedback image](https://github.com/certainty15750/Django-React/blob/master/Screenshots/IMG1.png)
![Relevance feedback image](https://github.com/certainty15750/Django-React/blob/master/Screenshots/IMG2.png)


## PROJECT STRUCTURE

This project developed with Django for backend and React for frontend.
You can see additional python packages in requirement.txt and additional frontend packages in package.json.

+ frontend `React 16.6.0`
    + public
    + src
        + components
        + constants
        + containers
            + App           `defined rooter`
            + Login         `Login page`
            + TaskPage      `Task Page`

+ backend `Django`
    + backend       `django setting app`
    + task          `api related with tasks`
    + users         `authentication & authorization`

## SERVER ENVIRONMENT SETUP ON GOOGLE CLOUD COMPUTE ENGINE
* ** Requirements: VirtualEnv with Python3.6 and Nodejs 10.0+ **
    + React.js `located on admin folder and will serve on localhost:3000`
    + Django `located on apiserver and will serve on localhost:8080`
+ Postgresql
    + `sudo apt install postgresql postgresql-contrib`
    + `https://linuxize.com/post/how-to-install-postgresql-on-ubuntu-18-04/`
    + `http://www.nixgyd.com/install-pgadmin4-ubuntu-18-04-server-mode/392`
+ Backend
    +    ```
            [Unit]
            Description=Gunicorn instance to serve annotation
            After=network.target
            
            [Service]
            User=root
            Group=www-data
            WorkingDirectory=/home/gui/annotation/backend
            Environment="PATH=/home/gui/annotation/backend/venv/bin"
            ExecStart=/home/gui/annotation/backend/venv/bin/gunicorn -w 3 --bind 0.0.0.0:8080 backend.wsgi
            [Install]
            WantedBy=multi-user.target
         ```
        
## How to start

+ React
  + npm install
  + npm start
    
+ Django
  + pip install
  + python manage.py runserver
