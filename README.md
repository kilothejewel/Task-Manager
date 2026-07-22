# Task-Manager
 
 This is a fullstack Task Manager application built using an ASP.NET Core Web API backend and an Angular frontend.
 
 ## Features
 
 * Add tasks
 * Complete tasks
 * Delete tasks
 * Mark tasks as high priority
 * Mark tasks as low priority
 * Mark tasks as medium priority
 
 ## Tech Stack
 
 ### Backend
 
 * ASP.NET Core Web API
 * C#
 * Entity Framework Core
 
 ### Frontend
 
 * Angular
 * TypeScript
 * HTML
 * CSS
 * Bootstrap

## Prerequisites
 
 * [.NET SDK](https://dotnet.microsoft.com/download) (version 8 or higher)
 * [Angular CLI](https://angular.io/cli)
 * [Node.js](https://nodejs.org/) (version 16 or higher)
 
 ## Getting Started 

 ### 1. Run the Backend API

 1. Open a terminal and navigate to the backend folder:

 ```bash
 cd  backend
 ```

 2. dotnet build

 3. dotnet run --launch-profile "http"

 The backend API will run locally at http://localhost:5095

 ### 2. Run the Frontend

 1. Open a new terminal and navigate to the frontend folder:

 ```bash
 cd frontend
 ```

 2. npm install

 3. npm run start

 The frontend will run locally at http://localhost:4200

 ## Running Unit Tests

 ### Backend
 
 ```bash
 cd backend.tests

 dotnet test 

 ```
 
 The backend unit tests will run and display the results in the terminal.

 ### Frontend
 
 ```bash
 cd frontend

 npm test
 ```
 
 The frontend unit tests will run and display the results in the terminal.