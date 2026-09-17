# Post Management API

A robust RESTful API built with **Node.js, Express 5, and TypeScript**. It uses **Prisma ORM** with **PostgreSQL** and provides full CRUD operations, CORS support, input validation, and centralized error handling.

---

## 📁 Directory Architecture

```text
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── server.ts
│   └── index.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* PostgreSQL

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### Initialize Database

```bash
npx prisma db push
npx prisma generate
```

---

## 🗄️ Data Model

The primary entity is `Post`.

| Field       | Type          | Attributes             |
| ----------- | ------------- | ---------------------- |
| `id`        | String / UUID | `@id @default(uuid())` |
| `title`     | String        | Required               |
| `content`   | String        | Required               |
| `author`    | String        | Required               |
| `createdAt` | DateTime      | `@default(now())`      |

### Prisma Model

```prisma
model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  author    String
  createdAt DateTime @default(now())
}
```

---

## 🚀 NPM Scripts

### Development

Runs the server with hot-reloading.

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Prisma Studio

```bash
npx prisma studio
```

---

# 📡 REST API Reference

### Base URL

```text
/api/v1/posts
```

---

## 1. Get All Posts

Retrieves all posts, sorted by `createdAt` in descending order.

### Request

```http
GET /api/v1/posts
```

### Response — `200 OK`

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Getting Started with Prisma",
    "content": "Prisma makes database interactions easy...",
    "author": "Jane Doe",
    "createdAt": "2026-09-18T10:00:00.000Z"
  }
]
```

---

## 2. Get a Single Post

Retrieves a specific post by ID.

### Request

```http
GET /api/v1/posts/:id
```

### Response — `200 OK`

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Getting Started with Prisma",
  "content": "Prisma makes database interactions easy...",
  "author": "Jane Doe",
  "createdAt": "2026-09-18T10:00:00.000Z"
}
```

### Error — `404 Not Found`

```json
{
  "error": "Post not found"
}
```

---

## 3. Create a Post

Creates a new post.

### Request

```http
POST /api/v1/posts
```

### Request Body

```json
{
  "title": "My New Post",
  "content": "This is the content of the post.",
  "author": "John Doe"
}
```

### Validation

The following fields are required:

* `title`
* `content`
* `author`

All fields must be strings.

### Response — `201 Created`

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "My New Post",
  "content": "This is the content of the post.",
  "author": "John Doe",
  "createdAt": "2026-09-18T10:00:00.000Z"
}
```

### Error — `400 Bad Request`

```json
{
  "error": "Validation failed",
  "details": [
    "title is required",
    "content is required"
  ]
}
```

---

## 4. Update a Post

Updates an existing post by ID.

### Request

```http
PUT /api/v1/posts/:id
```

or

```http
PATCH /api/v1/posts/:id
```

### Request Body

All fields are optional.

```json
{
  "title": "Updated Title"
}
```

### Response — `200 OK`

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Updated Title",
  "content": "This is the content of the post.",
  "author": "John Doe",
  "createdAt": "2026-09-18T10:00:00.000Z"
}
```

### Error — `404 Not Found`

```json
{
  "error": "Post not found"
}
```

---

## 5. Delete a Post

Deletes a post from the database.

### Request

```http
DELETE /api/v1/posts/:id
```

### Response — `200 OK`

```json
{
  "message": "Post successfully deleted"
}
```

### Error — `404 Not Found`

```json
{
  "error": "Post not found"
}
```

---

# 🔄 CRUD Overview

| Operation | Method      | Endpoint            | Description   |
| --------- | ----------- | ------------------- | ------------- |
| Create    | `POST`      | `/api/v1/posts`     | Create a post |
| Read All  | `GET`       | `/api/v1/posts`     | Get all posts |
| Read One  | `GET`       | `/api/v1/posts/:id` | Get one post  |
| Update    | `PUT/PATCH` | `/api/v1/posts/:id` | Update a post |
| Delete    | `DELETE`    | `/api/v1/posts/:id` | Delete a post |

---

# 🧩 Technologies Used

* **Node.js**
* **Express 5**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL**
* **CORS**
* **dotenv**

---

# 🔄 Request Flow

```text
Client
  ↓
HTTP Request
  ↓
Express Route
  ↓
Controller
  ↓
Prisma ORM
  ↓
PostgreSQL
  ↓
Prisma ORM
  ↓
Controller
  ↓
HTTP Response
  ↓
Client
```

### Example: Creating a Post

```text
Frontend
   ↓
POST /api/v1/posts
   ↓
Express Route
   ↓
Post Controller
   ↓
Prisma
   ↓
PostgreSQL
   ↓
Post Created
   ↓
JSON Response
   ↓
Frontend
```

---

# 🛠️ Useful Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Build project
npm run build

# Start production server
npm start
```

---

## 📄 License

This project is open-source and available for learning and development purposes.
