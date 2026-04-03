<p align="center">
  <a href="https://expressjs.com/" target="blank"><img src="express.png" width="500" alt="Express JS Logo" /></a>
</p>

# Backend - Review Management API

A RESTful API service for managing product reviews, built as part of the **skripsi-serverless** thesis project exploring serverless architecture patterns.

## Features

- Product review management via REST API
- Basic HTTP Authentication for security
- PostgreSQL database with Sequelize ORM
- CORS enabled for cross-origin requests
- Hot-reload support during development

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v4.18.2
- **Database**: PostgreSQL + Sequelize ORM v6.28.0
- **Authentication**: HTTP Basic Auth
- **Dev Tools**: Nodemon (hot-reload), dotenv (environment management)

## Prerequisites

- Node.js (see `.nvmrc` for recommended version)
- PostgreSQL database (local or cloud-hosted)

## Installation

```bash
npm install
```

## Environment Configuration

1. Copy the environment template:
```bash
cp .env.example .env       # for production
# or
cp .env.example .env.dev   # for development
```

2. Configure the required environment variables:

```bash
# Basic Authentication
BASIC_AUTH_USERNAME=your_username
BASIC_AUTH_PASSWORD=your_password

# PostgreSQL Connection
PGUSER=your_db_user
PGHOST=your_db_host
PGPASSWORD=your_db_password
PGDATABASE=your_db_name
PGPORT=5432
PGURI=postgresql://user:password@host:port/database
PGTABLE=reviews
```

## Running the Application

### Development Mode (with hot-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port **8000** (configurable via the `PORT` environment variable).

## API Endpoints

### Get All Reviews

**Endpoint**: `GET /api/v1/reviews`

**Authentication**: Required (Basic Auth)

**Response**:
```json
[
  {
    "id": 1,
    "rating": "5",
    "date": "2023-01-01",
    "variation": "Red",
    "verified_reviews": "true"
  }
]
```

**Example cURL**:
```bash
curl -u username:password http://localhost:8000/api/v1/reviews
```

## Database Model

### Reviews Table

| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary key |
| rating | STRING | Review rating |
| date | STRING | Review date |
| variation | STRING | Product variation |
| verified_reviews | STRING | Verification status |

## Project Structure

```
backend/
├── server.js          # Main application entry point
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .env               # Production environment (not tracked)
└── README.md          # This file
```

## License

This project is licensed under the [BSD 3-Clause License](LICENSE.md).
