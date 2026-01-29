# WTWR (What to Wear?): Back End

A Node.js/Express REST API server for the WTWR application featuring user authentication, clothing item management, and weather-based outfit recommendations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)

## Features

- User authentication with JWT tokens
- User profile management
- Clothing item CRUD operations
- Like/unlike functionality for items
- Password hashing with bcrypt
- MongoDB database integration
- CORS support
- Request validation

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcryptjs
- **Linting:** ESLint with Airbnb config
- **Code Formatting:** Prettier
- **Development:** Nodemon for hot reload

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Pacnatz/se_project_express.git
   cd se_project_express
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure MongoDB is running locally on `localhost:27017`

## Running the Project

- `npm run start` — Launch the production server
- `npm run dev` — Launch the development server with hot reload (nodemon)
- `npm run lint` — Run ESLint to check code quality

The server runs on **port 3001** by default.

## API Documentation

### Base URL

```
http://localhost:3001
```

### Authentication Routes

**Sign Up**

```
POST /signup
Body: { name, avatar, email, password }
Response: { _id, name, avatar, email }
```

**Sign In**

```
POST /signin
Body: { email, password }
Response: { token }
```

### User Routes

**Get Current User** (requires auth)

```
GET /users/me
Response: { _id, name, avatar, email }
```

**Update User Profile** (requires auth)

```
PATCH /users/me
Body: { name, avatar }
Response: { _id, name, avatar, email }
```

### Clothing Item Routes

**Get All Items**

```
GET /items
Response: [{ _id, name, weather, imageUrl, owner }, ...]
```

**Create Item** (requires auth)

```
POST /items
Body: { name, weather, imageUrl, owner }
Response: { _id, name, weather, imageUrl, owner }
```

**Delete Item** (requires auth)

```
DELETE /items/:itemId
Response: { message: "Item deleted" }
```

### Like Routes

**Like an Item** (requires auth)

```
POST /items/:itemId/likes
Response: { likes: [...] }
```

**Unlike an Item** (requires auth)

```
DELETE /items/:itemId/likes
Response: { likes: [...] }
```

## Project Structure

```
se_project_express/
├── app.js                 # Main application entry point
├── package.json
├── README.md
├── sprint.txt             # Sprint number for CI/CD
├── controllers/           # Route handlers
│   ├── items.js
│   ├── likes.js
│   └── users.js
├── middlewares/           # Express middleware
│   └── auth.js            # JWT authentication middleware
├── models/                # Mongoose schemas
│   ├── item.js
│   └── user.js
├── routes/                # API route definitions
│   ├── index.js           # Main router
│   ├── items.js
│   ├── likes.js
│   └── users.js
├── utils/                 # Utility functions
│   ├── config.js          # Configuration constants
│   └── errors.js          # HTTP status codes
└── .github/workflows/     # CI/CD workflows
    └── tests.yml
```

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/1IcIbikVTsbDP-3FydYF2z8i5Ij23S_Km/view?usp=sharing), where I describe my
project and some challenges I faced while building it.

## Author

Created by Nhat Chu

## License

This project is part of the TripleTen Software Engineering Program.
