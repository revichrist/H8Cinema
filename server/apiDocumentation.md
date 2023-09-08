# Movie API Documentation

## Endpoints :

List of available endpoints:

1. `POST /movies`
2. `GET /movies`
3. `GET /movies/:id`
4. `DELETE /movies/:id`
5. `GET /genres`
6. `POST /register`
7. `POST /login`
8. `POST /google-sign-in`
9. `GET /`
10. `PUT /movies/:id`
11. `PATCH /movies/:id`
12. `GET /histories`

&nbsp;

## 1. POST /movies

Description:

- Add new movie to the database

Request:

- body:

```json
{
  "title": STRING,
  "synopsis": TEXT,
  "trailerUrl": STRING,
  "imgUrl" : STRING,
  "rating": INTEGER,
  "genreId": INTEGER
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (201 - Created)_

```json
{
  "statusCode": 201,
  "data": {
    "id": INTEGER,
    "title": STRING,
    "synopsis": TEXT,
    "trailerUrl": STRING,
    "imgUrl": STRING,
    "rating": INTEGER,
    "genreId": INTEGER,
    "authorId": INTEGER,
    "status": STRING,
    "deletedAt": STRING,
    "updatedAt": DATE,
    "createdAt": DATE
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "message": [
    "Movie title is required",
    "Synopsis is required",
    "Minimum rating is 1",
    "Genre is required"
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "You need to login before accessing even further"
}
```

&nbsp;

## 2. GET /movies

Description:

- Get all movie data (including the user and genre)

Request:

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "data": [
        {
            "id": INTEGER,
            "title": STRING,
            "synopsis": TEXT,
            "trailerUrl": STRING,
            "imgUrl": STRING,
            "rating": INTEGER,
            "genreId": INTEGER,
            "authorId": INTEGER,
            "status": STRING,
            "deletedAt": STRING,
            "createdAt": DATE,
            "updatedAt": DATE,
            "User": {
                "id": INTEGER,
                "username": STRING,
                "email": STRING,
                "role": STRING,
                "phoneNumber": STRING,
                "address": STRING,
                "createdAt": DATE,
                "updatedAt": DATE
            },
            "Genre": {
                "id": INTEGER,
                "name": STRING,
                "createdAt": DATE,
                "updatedAt": DATE
        }
        ...,
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "You need to login before accessing even further"
}
```

&nbsp;

## 3. GET /movies/:id

Description:

- Get movie data details with movie id

Request:

- params:

```json
{
  "id": INTEGER
}
```

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
[
 "statusCode": 200,
 "data": {
        "id": INTEGER,
        "title": STRING,
        "synopsis": TEXT,
        "trailerUrl": STRING,
        "imgUrl": STRING,
        "rating": INTEGER,
        "genreId": INTEGER,
        "authorId": INTEGER,
        "status": STRING,
        "deletedAt": STRING,
        "createdAt": DATE,
        "updatedAt": DATE
    }
]
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "You need to login before accessing even further"
}
```

_Response (404 - Not Found)_

```json
[
 "statusCode": 404,
 "message": "Can't find data"
]
```

&nbsp;

## 4. DELETE /movies/delete/:id

Description:

- Delete movie by id

Request:

- params:

```json
{
  "id": INTEGER
}
```

- header:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Hantu Merah with ID:1 has been deleted"
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "You need to login before accessing even further"
}
```

_Response (403 - Forbidden)_

```json
{
  "statusCode": 403,
  "message": "You are not authorized to do this action"
}
```

_Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "message": "Can't find data"
}
```

&nbsp;

## 5. GET /genres

Description:

- Read genre data

Request:

- headers:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": INTEGER,
      "name": STRING
    },
    {
      "id": INTEGER,
      "name": STRING
    },
    {
      "id": INTEGER,
      "name": STRING
    },
    {
      "id": INTEGER,
      "name": STRING
    }
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "You need to login before accessing even further"
}
```

## 6. POST /register

Description:

- Creating new account

Request:

- body:

```json
{
  "email": STRING,
  "password": STRING
}
```

_Response (201 - Created)_

```json
{
  "statusCode": 201,
  "message": "Successfully created",
  "data": {
    "id": INTEGER,
    "email": STRING
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "message": "This email is already taken, please input another one"
}

OR

{
  "statusCode": 400,
  "message": [
        "Minimum password length is 5 characters",
        "Email is required",
        "The email format you are inputting is invalid",
        "Password is required"
  ]
}
```

## 7. POST /login

Description:

- Login to the website

Request:

- body:

```json
{
  "email": STRING,
  "password": STRING
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "access_token": STRING,
  "username": STRING,
  "email": STRING,
  "role": STRING
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "message": "Email is required"

  OR

  "statusCode": 400,
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "Invalid password or email"
}
```

&nbsp;

## 8. POST /google-sign-in

Description:

- Login to the website via google OAuth

Request:

- headers:

```json
{
  "google_token": STRING
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "access_token": STRING,
  "username": STRING,
  "email": STRING,
  "role": STRING
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "There's an error when fetching user's token"
}
```

## 9. GET /

Description:

- First landing point to test the server whether it's running or not

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Hello World!"
}
```

## 10. PUT /movies/:id

Description:

- Editing 6 fields from Movies table

Request:

- params:

```json
{
  "id": INTEGER
}
```

- header:

```json
{
  "access_token": STRING
}
```

- body:

```json
{
  "title": STRING,
  "synopsis": TEXT,
  "trailerUrl": STRING,
  "imgUrl": STRING,
  "rating": INTEGER,
  "genreId": INTEGER
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Movie with ID:(id) was edited"
}
```

_Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "message": [
    "Movie title is required",
    "Synopsis is required",
    "Minimum rating is 1",
    "Genre is required"
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "You need to login before accessing even further"
}
```

_Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "message": "Can't find data"
}
```

## 11. PATCH /movies/:id

Description:

- Editing status column from Movies table

Request:

- params:

```json
{
  "id": INTEGER
}
```

- header:

```json
{
  "access_token": STRING
}
```

- body:

```json
{
  "status": STRING
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "(Movie title) with ID:(id) has its status changed to (status)"
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "You need to login before accessing even further"
}
```

_Response (403 - Forbidden)_

```json
{
  "statusCode": 403,
  "message": "You are not authorized to do this action"
}
```

_Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "message": "Can't find data"
}
```

## 12. GET /histories

Description:

- Fetching history data

- header:

```json
{
  "access_token": STRING
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
    "data": [
        {
            "id": INTEGER,
            "name": STRING,
            "description": STRING,
            "updatedBy": STRING,
            "createdAt": STRING,
            "updatedAt": STRING
        }
        ...
    ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "You need to login before accessing even further"
}
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```
