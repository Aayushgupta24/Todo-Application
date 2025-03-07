# Modern Todo Application

A full-stack todo application built with React and Node.js that allows users to manage tasks, collaborate with team members, and add notes to todos.

## Features

- 🔐 User authentication (register/login)
- ✅ Create, read, update todos
- 🏷️ Add tags to todos for organization
- 🎯 Set priority levels (low, medium, high)
- 👥 Assign todos to multiple users
- 📝 Add notes to todos
- 🎨 Modern UI with Tailwind CSS
- 👤 User management and switching

## Tech Stack

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Context API for state management
- React Hook Form

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account
- npm or yarn package manager

### Setup Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-app
```

2. Install Backend Dependencies:

```bash
cd backend
npm install
```

3. Configure Environment Variables:
   Create a `.env` file in the backend directory with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todoapp
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_here
```

4. Install Frontend Dependencies:

```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the Backend Server:

```bash
cd backend
npm run dev
```

2. Start the Frontend Development Server:

```bash
cd frontend
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Users

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users

### Todos

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo

### Notes

- `POST /api/notes` - Add note to todo

## Data Models

### User

```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Todo

```javascript
{
  title: String (required),
  description: String,
  priority: String (low/medium/high),
  completed: Boolean,
  user: ObjectId (ref: User),
  tags: [String],
  assignedUsers: [ObjectId] (ref: User),
  timestamps: true
}
```

### Note

```javascript
{
  content: String (required),
  todo: ObjectId (ref: Todo),
  timestamps: true
}
```

## Project Structure
