## API Documentation

### Register User

**Endpoint:** `/register`

**Method:** `POST`

**Description:** This endpoint registers a new user.

**Request Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string" // Optional, default is "Borrower"
}
```

**Validation:**

- `username`: Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

**Response:**

- **Success:**
  - **Status Code:** `201 Created`
  - **Body:**
    ```json
    {
      "token": "string",
      "user": {
        "_id": "string",
        "username": "string",
        "email": "string",
        "role": "string"
      }
    }
    ```
- **Error:**
  - **Status Code:** `400 Bad Request`
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "string",
          "param": "string",
          "location": "string"
        }
      ]
    }
    ```
  - **Status Code:** `400 Bad Request`
  - **Body:**
    ```json
    {
      "message": "User already exists"
    }
    ```

### Login User

**Endpoint:** `/login`

**Method:** `POST`

**Description:** This endpoint logs in an existing user.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Validation:**

- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

**Response:**

- **Success:**
  - **Status Code:** `201 Created`
  - **Body:**
    ```json
    {
      "token": "string",
      "user": {
        "_id": "string",
        "username": "string",
        "email": "string",
        "role": "string"
      }
    }
    ```
- **Error:**
  - **Status Code:** `400 Bad Request`
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "string",
          "param": "string",
          "location": "string"
        }
      ]
    }
    ```
  - **Status Code:** `401 Unauthorized`
  - **Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

### Example Usage

#### Register User

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
        "username": "john_doe",
        "email": "john@example.com",
        "password": "password123",
        "role": "Borrower"
      }'
```

#### Login User

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
        "email": "john@example.com",
        "password": "password123"
      }'
```

This documentation provides details on how to use the `/register` and `/login` endpoints, including request and response formats, validation rules, and example usage.
