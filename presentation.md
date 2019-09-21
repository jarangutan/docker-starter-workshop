---
theme: solarized
revealOptions:
  transition: "fade"
highlightTheme: "solarized-dark"
---

# docker-starter-workshop
Intro to docker workshop covering a "tiny_app" and a "big_app"

https://github.com/jarangutan/docker-starter-workshop

---

## What is in this repo?
### "tiny_app/"
This is a "Hello World" mini tutorial covering the basics of docker

### "big_app/"
This tutorial covers the use of `docker` with `docker_compose` to create a RESTful mechanical keyboard api using node and mongodb

---

## Pre-requisites
- A terminal (depends on your OS!)
- [docker](https://docs.docker.com/install/)
- [npm and NodeJS](https://www.npmjs.com/get-npm)
- [docker hub account](https://docs.docker.com/docker-hub/)
- (for big_app only) [docker-compose](https://docs.docker.com/compose/install/)

---

## Alternatives if you can't install locally
There are multiple cloud providers you can turn to for docker setups
----
### Digital Ocean
  - Requires credit card for verification
  - Is simple and has a pre-made docker droplet but only runs through CLI
  - [$50 credit trial available](https://try.digitalocean.com/performance/)
----
### ECS on Amazon Web Services
  - Tons of power with straightforward(ish) GUIs
  - [$35 or 100 credit trial available through AWS Educate](https://aws.amazon.com/education/awseducate/)

---

# "tiny_app/"

---

## Docker: The basics
Docker is a tool that lets developers easily build, deploy and run apps in containers that run using the host OS and its resources

**Benefits:**
- Allows users to package an app with all its dependencies into a standardized unit of software
- Containers are lightweight and can use the underlying system and its resources efficiently

----

### Containers vs Virtual Machine
![ ](https://i0.wp.com/blog.docker.com/wp-content/uploads/Blog.-Are-containers-..VM-Image-1.png?resize=1024%2C435&ssl=1)

---

## Making the app

---

### Setup
Create a folder called `tiny_app`
```bash
mkdir tiny_app
```

Run the following to create the package.json and install [express](https://expressjs.com/)
```bash
npm init --yes

npm install express
```

---

### Modifying package.json
Change package.json to look like this:
```json
{
  "name": "tiny_app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

---

### Adding code
Create the file `index.js`
Add the following to it:
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Tiny app listening on port ${port}!`))
```

---

### Testing it
Run the app with 
```
npm start
```

The following will pop up in your terminal:
```bash
Tiny app listening on port 3000!
```

Go to your favorite browser and enter the url
```
localhost:3000
```

The words `"Hello World!"` should appear

---

## Containerazing our app

---

### Dockerfile
This file contains a set of instructions that docker will use to build our image

In the same directory as our index.js (`tiny_app/`), create a new file named `Dockerfile`
```bash
touch Dockerfile
```

---

### Build instructions
Add the following lines to the `Dockerfile`
```Dockerfile
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
```

---

### .dockerignore
This file tells docker to ignore certain files when building

In the same directory (`tiny_app/`), create a file called `.dockerignore`

Add the following to it:
```
node_modules
npm-debug.log
Dockerfile
.dockerignore
```

---

### Folder structure
The folder structure at this point should look like this:

```bash
tiny_app/
├── .dockerignore
├── Dockerfile
├── index.js
├── package.json
└── package-lock.json
```

---

### Make sure you created your docker hub account
If you haven't, that is ok!

Ignore all the docker hub stuff that shows up next

---

### Building our image
Run this command in the same directory as our `Dockerfile`:
```
docker build -t <docker_hub_username>/tiny_app .
```
Make sure to replace `<dockerhub_username>` with your actual docker hub username!

- `.` represents the current directory (which has our `Dockerfile` and app)
- `-t <dockerhub_username>/tiny_app` tags our image so it's easier for us to reference it later
- ignore the npm warning

----

#### Building our image - success!
These messages should show up if everything went ok:

```
Successfully built 0a9a05baae85
Successfully tagged gavisch/tiny_app:latest
```

Your values will vary

---

### Checking our current local images
Lets check our current images by running:
```bash
docker image ls
```

We should see:

```bash
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
gavisch/tiny_app      latest              97d1e988389d        26 seconds ago      910MB
node                  latest              d8c33ae35f44        5 days ago          907MB
```

---

### Running a container with our new image
Run the image with the following command:
```bash
docker run --detach --name tiny_app --publish 80:3000 <dockerhub_username>/tiny_app
```

----

#### Run command breakdown
- `--detach` runs the container in detached mode (fancy word for in the background)
- `--name tiny_app` names our container "tiny_app" to make it easier to reference later
- `--publish 80:3000` publishes a containers port to the host with a mapping of `80` to `3000`
  - remember that we made tiny_app listen on port `3000` in `index.js`

A long alphanumeric string will indicate our container started successfully

---

### Checking out our new container
Run the command:
```bash
docker ps
```

You should see our new container running
```bash
CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                  NAMES
536eb60f599b        gavisch/tiny_app      "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        0.0.0.0:80->3000/tcp   tiny_app
```

---

### Testing our containerized tiny app
Go to your favorite browser and enter the url `localhost`

We should see `"Hello World!"`

Congrats! You have successfully containerized an app!

---

### Stopping our application
To stop our application from running, lets run a command using the name we gave the container `"tiny__app"`
```bash
docker stop tiny_app
```

We should see the name `tiny_app` pop up in our terminal signifying success

----

#### Seeing our stopped application
Use the command below to see all our stopped containers
```bash
docker ps -a
```

Our tiny_app container will show up with a `STATUS` of `Exited (0)`

---

### Deleting our stopped container
Remove the container using:
```bash
docker rm tiny_app
```

The name `tiny_app` will pop up again to tell us the command succeeded

Running `docker ps -a` will confirm our container has been deleted

---

### Publishing to docker hub
You can publish your image to a registry like docker hub to make your app available for others to download

----

#### Login
```bash
docker login -u your_dockerhub_username
```

Enter your password when prompted

----

#### Pushing
```bash
$ docker push your_dockerhub_username/tinyapp-demo
```
---

### Deleting our image
Lets delete our image with:
```
docker rmi <dockerhub_username>/tiny_app
```

The intermediate images used to build our image will also be deleted to clear up space

---

### Running our app using docker hub
Do the same command again now that we deleted our image
```bash
docker run --detach --name tiny_app --publish 80:3000 <dockerhub_username>/tiny_app
```

Since we don't have the image locally, docker will go to docker hub and pull down your newly pushed image and run it

---

### Congratulations!
You have learned the basics of working with docker

Carry on to play with docker-compose

---

# "big_app/"

---

## What is docker-compose?
>Compose is a tool for defining and running multi-container Docker applications

[docker compose documentation](https://docs.docker.com/compose/)]

----

### Only for prototyping
There are way better tools for managing multiple containers

`docker-compose` is good for prototyping

If production is the goal, use something like Kubernetes or Docker Swarm

---

## Our `big_app`
RESTful API with nodeJS, express, and mongodb

----

### Directory
```bash
big_app/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── src/
```

--- 

## Dockerfile
```Dockerfile
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
```

---

## docker-compose.yml
```yml
version: "3"
services:
  app:
    container_name: keyboard-api
    restart: always
    build: ./
    ports:
      - "8080:8080"
    volumes:
      - .:/app
    depends_on:
      - mongo
  mongo:
    container_name: mongo
    image: mongo
    ports:
      - "27017:27017"
```

----

### Breaking it down
We declare two services: `app` and `mongo`

----

#### Breaking it down - app
- `container_name: keyboard-api` Name of our container (similar to `--name` from before)
- `restart: always` Restarts the service if an error gets thrown. Good for debugging and live testing
- `build: ./` Build the current directory since it has our `Dockerfile`
- `ports: 80:8080` same as `-p 80:3000` from before
- `volumes: .:app/` A volume is a directory we specify to be mounted onto our container. This allows the sharing of files between the host and the container and even between containers
- `depends_on: mongo` Makes sure our mongo container spins up first

----

#### Breaking it down - mongo
- `container_name: mongo` Name our container mongo
- `image: mongo` This pulls the official mongodb image from Docker Hub. Similar to our FROM command inside the Dockerfile
- `ports: "27017:27017"` Bind port 27017 on our host to the mongodb default port inside the container. We're basically using our host as a network bridge between containers

---

## The source code
This is not a RESTful API tutorial so we won't delve into the code in src/

---

## The source code that matters
We have to change mongoose to connect to our mongo container IP. `mongo` will work similarly to `localhost` but instead of 127.0.0.1 it will be whatever IP our mongo container has. 

Change it from:
```javascript
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost:27017/expressmongo');
```

to:

```javascript
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://mongo:27017/expressmongo');
```

---

## Running our service
Start our service by running this command:
```bash
$ docker-compose up
```

You can add -d at the end of the command to run in detached mode

**Note** _Make sure you install docker-compose ;)_

---

## Testing our api
| request    | URI                |
| ---------- | ------------------ |
| __GET__    | /api/keyboards     |
| __POST__   | /api/keyboards     |
| __GET__    | /api/keyboards/:id |
| __PUT__    | /api/keyboards/:id |
| __PATCH__  | /api/keyboards/:id |
| __DELETE__ | /api/keyboards/:id | 

----

### POST
Add entry to our database
```bash
curl -X POST \
  http://localhost:8080/api/keyboards \
  -H 'Content-Type: application/json' \
  -d '{ "name": "Planck", "style": "ortholinear", "switch": "Zealio 65g"}'
```

----

### GET
Retrieve our new record
```bash
curl -X GET \
  http://localhost:8080/api/keyboards/
```

We should see

```
{"status":"success","message":"Sweet keyboards successfully retrieved!","data":[{"_id":"5c8413f28eb193001ed66783","create_date":"2019-03-09T19:28:50.537Z","name":"Planck","style":"ortholinear","switch":"Zealio 65g","__v":0}]}
```

---

## Congratulations!
You delved into what makes docker fun!

Hopefully this tutorial helps you in your journey to becoming a container pro :D
