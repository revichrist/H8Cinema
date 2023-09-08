# Customer Movie API Documentation

## Endpoints :

List of available endpoints:

1. `GET /cust/movies`
2. `GET /cust/movies:id`
3. `GET /cust/bookmark`
4. `POST /cust/login`
5. `POST /cust/register`
6. `POST /cust/googleLogin`
7. `POST /cust/bookmark/:id`
8. `DELETE /cust/bookmark/:id`
9. `POST cust/movies/generateCode`

&nbsp;

## 1. `GET /cust/movies`

Description:

- Fetch available movies within the database with pagination

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "totalData": INTEGER,
  "totalPage": INTEGER,
  "data": 
         [
            {
                "id": INTEGER,
                "title": STRING,
                "synopsis": STRING,
                "trailerUrl": STRING,
                "imgUrl": STRING,
                "rating": INTEGER,
                "genreId": INTEGER,
                "authorId": INTEGER,
                "status": STRING,
                "deletedAt": STRING,
                "createdAt": STRING,
                "updatedAt": STRING,
                "Genre": {
                    "id": INTEGER,
                    "name": STRING,
                    "createdAt": STRING,
                    "updatedAt": STRING
                }
            },
            {
              ...
            }
            ...
        ]

```

## 2. `GET /cust/movies/:id`

Description:

- Fetch 1 movie detail based on the Movie ID

Request:

- params:

```json
{
  "id": INTEGER
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "data":
          "id": INTEGER,
          "title": STRING,
          "synopsis": STRING,
          "trailerUrl": STRING,
          "imgUrl": STRING,
          "rating": INTEGER,
          "genreId": INTEGER,
          "authorId": INTEGER,
          "status": STRING,
          "deletedAt": STRING,
          "createdAt": STRING,
          "updatedAt": STRING,
          "Genre": {
              "id": INTEGER,
              "name": STRING,
              "createdAt": STRING,
              "updatedAt": STRING
          }

}
```

_Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "message": "Can't find data"
}
```

## 3. `GET /cust/bookmark`

Description:

- Fetch all current user's (logged account) bookmark list

Request:

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
            "CustomerId": INTEGER,
            "MovieId": INTEGER,
            "createdAt": STRING,
            "updatedAt": STRING,
            "Movie": {
                "id": INTEGER,
                "title": STRING,
                "synopsis": STRING,
                "trailerUrl": STRING,
                "imgUrl": STRING,
                "rating": INTEGER,
                "genreId": INTEGER,
                "authorId": INTEGER,
                "status": STRING,
                "deletedAt": STRING,
                "createdAt": STRING,
                "updatedAt": STRING
            }
        },
        {
          ...
        }
        ...
    ]
}
```

_Response (401 - Unauthorized)_

```json
  "statusCode": 401,
  "message": "You need to login before accessing even further"
```

## 4. `POST /cust/login`

Description:

- Login via email

Request:

- Body:

```json
  "email": STRING,
  "password": STRING
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "access_token": STRING
}
```

_Response (400 - Bad Request)_

```json
  "statusCode": 400,
  "message": "Email is required"

  OR

  "message": "Password is required"
```

_Response (400 - Unauthorized)_

```json
  "message": "Invalid password or email"
```

## 5. `POST /cust/register`

Description:

- Register new user to the database

Request:

- Body:

```json
  "email": STRING,
  "password": STRING
```

_Response (201 - Created)_

```json
    "statusCode": 201,
    "message": "Successfully created",
    "data": {
        "id": INTEGER,
        "email": STRING,
        "role": STRING
    }
```

_Response (400 - Bad Request)_

```json
    "statusCode": 400,
    "message": "Email is required"

    OR

    "message": "Password is required"

    OR

    "message": "Minimum password length is 5 characters"

    OR

    "message": "The email format you're inputting is invalid"

    OR

    "message": "Email must be unique"
```

## 6. `POST /cust/googleLogin`

Description:

- Login via google

Request:

- Headers:

```json
    "google_token": STRING,
```

_Response (200 - OK)_

```json
    "statusCode": 200,
    "access_token": STRING,
    "email": STRING,
    "role": STRING
```

_Response (401 - Unauthorized)_

```json
    "statusCode": 401,
    "message": "There's an error when fetching user's token"
```

## 7. `POST /cust/bookmark/:id`

Description:

- Add a new bookmark to user's list

Request:

- Headers:

```json
    "access_token": STRING
```

- Params:

```json
    "id": INTEGER
```

_Response (201 - Created)_

```json
{
  "statusCode": 201,
  "message": "Movie (movie_name) has been added to your bookmark list"
}
```

_Response (400 - Bad Request)_

```json
    "statusCode": 400,
    "message": "This movie is already added in your list"
```

_Response (401 - Unauthorized)_

```json
  "statusCode": 401,
  "message": "You need to login before accessing even further"
```

_Response (404 - Not Found)_

```json
    "statusCode": 404,
    "message": "Can't find data"
```

## 8. `DELETE /cust/bookmark/:id`

Description:

- Removing a single bookmark from user's list

Request:

- Headers:

```json
    "access_token": STRING
```

- Params:

```json
    "id": INTEGER
```

_Response (200 - OK)_

```json
    "statusCode": 200,
    "message": "(movie_name) has been removed from your bookmark"
```

_Response (401 - Unauthorized)_

```json
  "statusCode": 401,
  "message": "You need to login before accessing even further"
```

_Response (404 - Not Found)_

```json
    "statusCode": 404,
    "message": "Can't find data"
```

## 9. `POST cust/movies/generateCode`

Description:

- Generating QR Code (3rd Party API)

Request:

- Body:

```json
  "link": STRING
```

_Response (200 - OK)_
```json
  STRING 
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```
