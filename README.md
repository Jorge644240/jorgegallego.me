# **jorgegallego.me**

This is the official repository for Jorge Gallego's personal website at [jorgegallego.me](https://jorgegallego.me).

The project is divided into directories (folders) that each group pieces of code with similar intents within the bigger application.

## **Contents**

- [Project Structure](#project-structure)
	- [Views](#views)
	- [Static](#static)
	- [Routes](#routes)
	- [Models](#models)
	- [Middleware](#middleware)
	- [Data](#data)
	- [Controllers](#controllers)
	- [Tests](#tests)
- [Security](#security)
- [License](#license)

## **Languages and Tools**

This project was built using the following languages, tools and services:

1. HTML5/CSS3 - FE
2. JavaScript - FE
3. [Pug](https://pugjs.org) - Template Engine
4. [NodeJS](https://nodejs.org)/[Express](https://expressjs.com) - BE
5. [ESLint](https://eslint.org) - Code Formatting
6. [Jest](https://jestjs.io) - Unit Testing
7. [Sequelize](https://sequelize.org) - ORM
8. [AWS RDS](https://aws.amazon.com/rds) - RDBMS
9. [GitHub Actions](https://github.com/features/actions) - Automation/CI

## **Project Structure**

The root folder of the project contains the [main (entry) Node.js file](server.js), the npm configuration files ([package.json](package.json) and [package-lock.json](package-lock.json)),the [.eslintrc.json](.eslintrc.json) file and the [.gitignore](.gitignore) file.

All subfolders (views, routing, models, etc...) are hosted within the root folder.

### **Views**

The [`views`](views/) folder contains all files used to render the pages in the website. Some files are hosted in the first level of the directory, some are contained together in files according the sections of the website they are relevant to or the functionality/purpose they server within the application (i.e. all email templates are hosted together in the `emails` subfolder).

This folder defines the view section of the [MVC design pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC).

*Note: This behavior is also used for static CSS and JavaScript files in the static folder, and will be used in any other folders in the project structure as necessary.*

### **Static**

The [`static`](static/) folder hosts all of the static files of the site. The term 'static file' refers to any file which content doesn't change dynamically when loaded into the site. However, said content may affect the page on which it loads, as is the case for JavaScript files, or the way said content is presented, like CSS files.

This folder contains the following subfolders:

1. [`css`](static/css/) (for all style-related files)
2. [`js`](static/js/) (for all front-end JavaScript files)

### **Routes**

The [`routes`](routes/) folder contains all files related to Back End routing. All routes and their handlers are defined inside the files in this folder, and then imported into the main server file (server.js) in the root folder to be used by the application.

### **Models**

The [`models`](models/) folder hosts all of the data model definitions created as class extensions of the Sequelize Model class. 

This folder defines the model section of the [MVC design pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC).

Each file defines and exports a different data model, which is then used in the controllers/ folder to define the next layer of the MVC pattern.

### **Middleware**

The [`middleware`](middleware/) folder hosts reusable Express middleware functions not meant to be used as route handlers, like those in the routes folder, e.g. Rate Limiting middleware for specific routes and requests.

Files in this folder follow the same classification principle as those in the [views](views/) and [static](static/) folders.

### **Data**

The [`data`](data/) folder contains files of relevance to the application, but that dont fit into the folders decribed above, the application documentation, or any other part of the MVC design pattern.

This folder hosts definitions for the database connections definitions and all custom error definitions, but its contents are not limited to the ones mentioned.

### **Controllers**

The [`controllers`](controllers/) folder contains all of the data controller definitions built on top of the models defined in the models/ folder. 

This folder defines the model section of the [MVC design pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC).

Each file defines and exports a different data controller built on top of the respective data model it controlls.

### **Tests**

The [`tests`](tests/) folder holds the [Jest](https://jestjs.io) config file in JSON format ([`jest.config.json`](tests/jest.config.json)) and all test suite definitions for data models, controllers, and any other testable part of the application.

#### **Running all tests/test suites**

Testing for this project is based on [Jest](https://npmjs.com/package/jest), and the structures being tested depend on other packages. 

To that end, running the tests in this project involves the following steps:

1. Run `npm ci` to generate a clean install of the required packages.
2. Run `npm test` to automatically run all the test suites in the tests folder with Jest.

## **Security**

For security purposes, this repository makes use of some GitHub-provided code security tools. This repository is set up with GitHub's [Dependabot](https://github.com/dependabot) to find outdated and/or vulnerable dependencies. In this case, Dependabot is not configured to fix the issues automatically, this must be done by [the developer](https://github.com/Jorge644240).

This repository also makes use of GitHub Actions for automated code testing and scanning capabilities with Workflows. Code Testing is achieved with the **Node.js CI** workflow, while code scanning is provided with **CodeQL**. The configuration files for both of these workflows are available in the [.github/workflows](.github/workflows/) folder.

## **License**

This repository and it's contents are property of Jorge Gallego. For more information, see the [LICENSE](LICENSE).