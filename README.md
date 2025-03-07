# Modern Todo Application

A full-stack todo application built with React and Node.js that allows users to manage tasks, collaborate with team members, and add notes to todos.

## Features

- 🔐 User authentication (register/login)
- ✅ Create, read, update, and delete todos
- 🏷️ Add tags to todos for better organization
- 🎯 Set priority levels (low, medium, high)
- 👥 Assign todos to multiple users
- 📝 Add notes to todos
- 🎨 Modern and responsive UI
- 🌓 Light/Dark mode support

## Tech Stack

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Context API for state management
- React Hook Form for form handling

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally or a MongoDB Atlas account
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd todo-app
```

2. Install Backend Dependencies

```bash
cd backend
npm install
```

3. Configure Environment Variables
   Create a `.env` file in the backend directory:

````

4. Install Frontend Dependencies
```bash
cd ../frontend
npm install
````

### Running the Application

1. Start the Backend Server

```bash
cd backend
npm run dev
```

2. Start the Frontend Development Server

```bash
cd frontend
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users

### Todos

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Notes

- `POST /api/notes` - Add a note to a todo

## Data Models

### User

- username (String, required, unique)
- email (String, required, unique)
- password (String, required, hashed)

### Todo

- title (String, required)
- description (String)
- priority (String: low/medium/high)
- completed (Boolean)
- user (Reference to User)
- tags (Array of Strings)
- assignedUsers (Array of User References)
- timestamps

### Note

- content (String, required)
- todo (Reference to Todo)
- timestamps

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
