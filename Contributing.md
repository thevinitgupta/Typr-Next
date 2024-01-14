# Contributing Guide 👈🏻

Welcome to the contributing guide for Typr Next – a NextJS application that helps users improve their typing skills and tracks their progress over time through a graph. We greatly appreciate your interest in contributing to our project and we are excited to have you on board!

Contributing to open source projects is a great way to learn new skills, collaborate with other developers, and make a positive impact on the community. In this guide, we will walk you through the steps of contributing to Typr Next and provide you with some guidelines to ensure a smooth and productive experience.

## Step 1: Familiarize Yourself with NextJS
NextJS is a popular React framework for building server-rendered and statically exported applications. In order to contribute to Typr Next, it is important to have a basic understanding of NextJS and how it works. This will help you navigate through the project structure and codebase easily.

> Note : If you are new to NextJS, we recommend going through their official documentation and tutorials to get familiar with the framework.

## Step 2: Set Up Your Development Environment
Before you can start contributing to Typr Next, you will need to set up your local development environment. You will need to have Node.js installed on your machine to run the project. Follow these steps to get started:

### 1. Clone the repository using the following command:
```
git clone https://github.com/typr-next/typr-next.git
```

### 2. Navigate to the project directory and install dependencies:
```
cd typr-next
npm install
```

### 3. Make sure all the dependencies are successfully installed and the application runs without any errors by running the development server:
```
npm run dev
```

### 4. Once the development server is up and running, you can access the application at http://localhost:3000.

## Step 3: Understand the Project Structure
Typr Next follows a standard NextJS project structure. Here are the main folders and their purpose:

- **components**: Contains all the reusable UI components used in the application.
- **pages**: Contains all the pages that are rendered on the client and server side.
- **public**: Contains all the static assets used in the application.
- **styles**: Contains all the global styles for the application.
- **utilities**: Contains helper functions and utilities used in the application.

## Step 4: Pick an Issue to Work On
Now that you have your development environment set up and have a good understanding of the project structure, it's time to pick an issue to work on. You can find a list of open issues on our GitHub repository under the "issues" tab.

We suggest starting with simpler issues and gradually moving to more complex ones as you get familiar with the project. If you have any doubts or need clarification, feel free to ask on the issue thread or reach out to our team for help.

## Step 5: Fork the Repository and Create a Branch
Before you start working on an issue, it is important to create your own fork of the repository. This will allow you to make changes and test them without affecting the main codebase. Follow these steps to fork the repository and create a new branch:

1. Click on the "Fork" button on the top-right corner of the repository page on GitHub.

2. Once the fork is complete, navigate to your new forked repository and clone it to your local machine using the following command:
```
git clone https://github.com/<your-username>/typr-next.git
```

3. Create a new branch for your changes:
```
cd typr-next
git checkout -b <branch-name>
```

## Step 6: Make Your Changes and Test
Now that you have your own branch, you can make changes to the codebase. Once you have made your changes, it is important to test them thoroughly to ensure they work as expected. Run the development server using the command ``npm run dev`` and test the application.

## Step 7: Submit a Pull Request
Once you are satisfied with your changes and they are tested and working, it's time to submit a pull request. Follow these steps to create a pull request:

1. Push your changes to your forked repository:
```
git add .
git commit -m "Your commit message"
git push origin <branch-name>
```

2. Go to your forked repository on GitHub and click on the "Compare & pull request" button next to your branch name.

3. Fill in the necessary details such as a title and description for your pull request. Be sure to reference the issue number in your pull request description.

4. Click on the "Create pull request" button and your pull request is now ready to be reviewed by our team.

Congratulations! You have successfully made a contribution to Typr Next. Our team will review your pull request and provide feedback if any changes are required. Once your pull request is approved and merged, your changes will be reflected in the main code