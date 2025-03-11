📌 TodoApp - Ask Questions & Answers

🚀 Overview

TodoApp is a full-stack MERN (MongoDB, Express.js, React, Node.js) application where users can create and manage their todos and ask/answer questions. This project helps users collaborate by allowing them to post questions and provide answers.

✨ Features

✅ User authentication (signup/login)

✅ Create, update, and delete todos

✅ Ask questions and provide answers

✅ Real-time updates

✅ Backend built with Node.js and Express.js

✅ Frontend built with React and Tailwind CSS

✅ State management using Redux

✅ Database with MongoDB

🏗 Tech Stack

Frontend: React.js, Redux, Tailwind CSS

Backend: Node.js, Express.js, Mongoose

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

State Management: Redux Toolkit

🔧 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/yourusername/todoApp.git
cd todoApp

2️⃣ Backend Setup

cd backend
npm install

Create a .env file in the backend directory and add your MongoDB connection string:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=7000

Run the backend server:

npm start

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

🛠 API Endpoints

User Routes

POST /api/user/signup - Register a new user

POST /api/user/login - Login a user

GET /api/user/profile - Get user profile

Todo Routes

POST /api/todo/create - Create a new todo

GET /api/todo/all - Fetch all todos

PUT /api/todo/update/:id - Update a todo

DELETE /api/todo/delete/:id - Delete a todo

DELETE /api/todo/deleteall - Delete all todos

Question & Answer Routes

POST /api/todo/addAnswer - Add an answer to a todo

GET /api/todo/:id - Fetch a specific todo with answers

🔄 How to Contribute

Fork the repository.

Create a new branch: git checkout -b feature-branch.

Commit your changes: git commit -m 'Added new feature'.

Push to the branch: git push origin feature-branch.

Open a pull request.

📜 License

This project is open-source and available under the MIT License.

📧 Contact: If you have any questions, feel free to reach out!

