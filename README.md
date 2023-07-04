# :construction: README em construção ! :construction:
# 🛵 Delivery App
A delivery-app webpage developed as a [Trybe](https://www.betrybe.com) Project.

## 💻 About this project
This is a full-stack project in which front-end, back-end and database were build from scratch.

Through front-end layer, the user can use all back-end layer services. The services include to log in, register new customer, manage sellers, make beverage orders, list orders, check order details, and change order status. Front-end is a Single Page Application and back-end is a RESTful API built in Model-Service-Controller architecture.

The application has 4 user flows:
- Common Flow: comprehends login and register pages.
- Customer Flow: comprehends products, checkout, orders and order details pages.
- Seller Flow: comprehends orders and order details/management pages.
- Administrator Flow: comprehends users management page.

Both front-end and back-end layers have some tests implemented.

## 🛠️ Built with
<a href="https://www.w3.org/TR/CSS/#css" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /></a>
<a href="https://www.chaijs.com" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red" alt="Chai.js" /></a>
<a href="https://expressjs.com" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /></a>
<a href="https://jestjs.io" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" /></a>
<a href="https://jwt.io" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JSON Web Tokens" /></a>
<a href="https://www.mysql.com" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" /></a>
<a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /></a>
<a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a>
<a href="https://reactrouter.com/en/main" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" /></a>
<a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white" alt="React Testing Library" /></a>
<a href="https://sequelize.org" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" alt="Sequelize" /></a>
<a href="https://sinonjs.org" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon" alt="Sinon.js" /></a>

## 🎯 Used skills
- REST API building
- CRUD using ORM.
- MySQL data modeling using Sequelize
- Tables creation and association using Sequelize models
- Integration tests
- Mocked tests

## 👥 Developed in group with
- [Cláudio Melgaço](https://github.com/melgacoc)
- [Isabelle Strojake](https://github.com/isabellestrojake)
- [Talita Saez](https://github.com/talitasaez)

## 🏁 Getting started
### 🐳 Installing Docker
You can use Docker to containerizing the  MySQL database. You can see [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) or in the [docs](https://docs.docker.com/compose/install/) how to install it.
MySQL Docker images available [here](https://hub.docker.com/_/mysql).

### ⬇️ Installing the dependencies
Node.js version must be 16 or higher, otherwise the isntallation will fail to prevent version conflict. You can use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to Node.js version management.
In project root, back-end folder and front-end folder terminals, run:
```
npm install
```

### 🌱 Defining back-end enviroment variables
In back-end folder, create a `.env` file with the following content:
```
NODE_ENV=development
API_PORT=3001
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=senha-mysql
MYSQL_DB_NAME=delivery-app
EVAL_ALWAYS_RESTORE_DEV_DB=true
```

### 🏃‍♀ Running the application
You database must be settled. If using Docker, the container must be running.
In back-end folder terminal, run:
```
npm run dev
```
In front-end folder terminal, run:
```
npm start
```
In this point, a new tab must open in your default web browser and you can use the application.

## 🧪 Testing
You must run the testing commands in back-end or front-end folders terminals. 
To simply test the application, run:
```
npm run test:coverage:json
```
To additionally get a coverage report, run:
```
npm run test:coverage
```

