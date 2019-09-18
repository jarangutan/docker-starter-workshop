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
Here are two cloud providers you can turn to for docker setups
---
### Digital Ocean
  - Requires credit card for verification
  - Is simple and has a pre-made docker droplet but only runs through CLI
  - [$50 credit trial available](https://try.digitalocean.com/performance/)
---
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

---

## Containers vs Virtual Machine
![ ](https://i0.wp.com/blog.docker.com/wp-content/uploads/Blog.-Are-containers-..VM-Image-1.png?resize=1024%2C435&ssl=1)

---

## Making the app - part 1
Run the following to create the package.json and install [express](https://expressjs.com/)
```
$ npm init --yes
$ npm i express
```
