---
theme: solarized
revealOptions:
  transition: "fade"
highlightTheme: "solarized-dark"
---

# docker-starter-workshop
Intro to docker workshop covering a "tiny_app" and a "big_app"

---

## What is in this repo?
### "tiny_app/"
This is a "Hello World" mini tutorial covering the basics of docker

### "big_app/"
This tutorial covers the use of `docker` with `docker_compose` to create a REST mechanical keyboard api using node and mongodb

---

## Pre-requisites
- A terminal (depends on your OS!)
- [docker](https://docs.docker.com/install/)
- [npm and NodeJS](https://www.npmjs.com/get-npm)
- [A docker hub account](https://docs.docker.com/docker-hub/)
- (For big_app only) [docker-compose](https://docs.docker.com/compose/install/)

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
Docker is a tool that lets developers & sysadmins easily deploy apps in containers that can run on the host operating system

**Benefits:**
- Allows users to package an app with all its dependencies into a standardized unit for software development
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
This file containes a set of instructions that docker will use to build our image

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
- _`--detach`_ runs the container in detached mode (fancy word for in the background)
- _`--name tiny_app`_ names our container "tiny_app" to make it easier to reference later
- _`--publish 80:3000`_ publishes a containers port to the host with a mapping of `80` to `3000`
  - remember that we made tiny_app listen on port _`3000`_ in _`index.js`_

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
Go to your favorite browser and enter the url _`localhost`_

We should see _`"Hello World!"`_

Congrats! You have successfully containerized an app!

---

### Stopping our application
To stop our application from running, lets run a command using the name we gave the container _`"tiny_app"`_
```bash
docker stop tiny_app
```

We should see the name _`tiny_app`_ pop up in our terminal signifying success

----

#### Seeing our stopped application
Use the command below to see all our stopped containers
```bash
docker ps -a
```

Our tiny_app container will show up with a _`STATUS`_ of _`Exited (0)`_

---

### Deleting our stopped container
Remove the container using:
```bash
docker rm tiny_app
```

The name _`tiny_app`_ will pop up again to tell us the command succeeded

Running _`docker ps -a`_ will confirm our container has been deleted

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

---

# "big_app/"

---



