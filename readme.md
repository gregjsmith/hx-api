# Demo User Api

A simple api to create, delete, edit and get users. Implemented using nodeJs, Express and React.

A user object consists of the following properties:

* _id
    * string
    * a unique, database generated key for the user
* givenName
    * string
    * the user's given, or first name
* familyName
    * string
    * the user's family, or second name
* age
    * number
    * the user's age in years
* email
    * string
    * the user's email address


## Installation

`npm install`


## Tasks

`npm start`
Run the backend nodeJS server (using nodemon) and webpack build of the UI. The application will run on port 3000: http://localhost:3000/

`npm test`
Run test suite using Jest

## Requests

The api exposes functionality to get all, get one, create, update and delete users.

#### Get all users
##### Request

```sh
curl -X GET \
  http://localhost:3000/api/users/ \
  -H 'cache-control: no-cache'
```

##### Response

Success: 200

Error: 500

No users found: 404

```json
[
    {
        "email": "johan@blowhan.com",
        "givenName": "Johan",
        "familyName": "Blowhan",
        "age": 85,
        "created": "2018-11-15T20:22:52+00:00",
        "_id": "5kQxib7cpHWxdLp0"
    },
    {
        "email": "Test@john.com",
        "givenName": "John",
        "familyName": "Smith",
        "age": 34,
        "created": "2018-11-11T07:09:42+00:00",
        "_id": "ALCHZcjTQeApRgUd"
    }
]
```

#### Get one user by id
##### Request

```sh
curl -X GET \
  http://localhost:3000/api/users/Os8Ig79WcBi2RlS4 \
  -H 'cache-control: no-cache'
```

##### Response

Success: 200

Error: 500

No users found: 404

```json
{
    "email": "johan@bohan.com",
    "givenName": "Johan",
    "familyName": "Bohan",
    "age": 85,
    "created": "2018-11-15T23:33:59+00:00",
    "_id": "Os8Ig79WcBi2RlS4"
}
```


#### Create a new User
##### (mandatory properties: `givenName`, `familyName`, `age` and `email`)

##### Request
```sh
curl -X POST \
  http://localhost:3000/api/users/ \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "email": "johan@bohan.com",
    "givenName": "Johan",
    "familyName": "Bohan",
    "age": 85
}'
```

##### Response

Sucess: 201

Error: 500

```json
{
    "user": {
        "email": "johan@bohan.com",
        "givenName": "Johan",
        "familyName": "Bohan",
        "age": 85,
        "created": "2018-11-15T21:47:58+00:00",
        "_id": "gc5IxLzfobcJjvnv"
    },
    "status": "created"
}
```

#### Update an existing user
##### (mandatory properties: `_id`, `givenName`, `familyName`, `age` and `email`)
##### Request

```sh
curl -X POST \
  http://localhost:3000/api/users/ \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d ' {
        "email": "johan@crowhan.com",
        "givenName": "Johan",
        "familyName": "Crowhan",
        "age": 85,
        "_id": "gc5IxLzfobcJjvnv"
    }'
```

##### Response

Sucess: 200

Error: 500

```json
{
    "user": {
        "email": "johan@chrowhan.com",
        "givenName": "Johan",
        "familyName": "Crowhan",
        "age": 85,
        "created": "2018-11-15T21:47:58+00:00",
        "_id": "gc5IxLzfobcJjvnv",
        "updated": "2018-11-15T21:51:55+00:00"
    },
    "status": "updated"
}
```

#### Delete one user by id
##### Request

```sh
curl -X DELETE \
  http://localhost:3000/api/users/Os8Ig79WcBi2RlS4 \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "_id": "3xwD67clO63qIKuJ"
}'
```

##### Response

Success: 204

Error: 500

No user found: 404

```json
{
    "removed": 1
}
```

# Demo User Website

Site is a work in progress. A basic list of users can be accessed on the UI at the root URL: http://localhost:3000/
