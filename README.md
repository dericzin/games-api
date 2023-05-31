# games-api
This API is used as a registration and data storage system for games.
## Endpoints
### GET /games
This endpoint is responsible for returning the list of all available games in the database.
#### Parameters
None
#### Responses 
##### OK! 200
If this response occurs, you will receive the list of games.

Example of response:
```
[
    {
        "_id": "646e7481ee48bc8e9019783b",
        "title": "Overwatch 2",
        "year": 2022,
        "price": 0,
        "__v": 0
    },
    {
        "_id": "646e75c0ee48bc8e9019783f",
        "title": "Counter-Strike: Global Offensive",
        "year": 2012,
        "price": 0,
        "__v": 0
    },
    {
        "_id": "6474ec886b021ca5ce767f84",
        "title": "League of Legends",
        "year": 2010,
        "price": 0,
        "__v": 0
    }
]
```
##### Authentication Failure! 401
If this response occurs, this means that an error occurred during the authentication process. 
Reasons: Invalid token, expired token.

Example of Response : 

```
{
    "err": "Invalid Token"
}
```

### POST /auth
This endpoint is responsible for authenticating a user.
#### Parameters
email: Email of the user registered in the system.

password: Password of the user registered in the system with the determined email.

Example:
```
{"email": "victordevtb@guiadoprogramador.com",
"password": "nodejs<3"}
```
#### Responses 
##### OK! 200
If this response occurs, you will receive a JWT token to access protected endpoints.

Example of response:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2aWN0b3JkZXZ0YkBndWlhZG9wcm9ncmFtYWRvci5jb20iLCJpYXQiOjE2ODUzODY2NjYsImV4cCI6MTY4NTU1OTQ2Nn0.kSK5Ijcdb873JLau9IVLc_hZC1JgYoHeimTTqCYoyhA"
}
```
##### Authentication Failure! 401
If this response occurs, this means that an error occurred during the authentication process. 
Reasons: Invalid email or password.

Example of Response : 

```
{
    "err": "Invalid Credentials"
}
```
### GET /game/:id
This endpoint is responsible for returning a game based on its ID.
#### Parameters
id: ID of the game registered in the database.
Example:
```
"_id": "6476b237530a1ab8709f43c3"
```
#### Responses 
##### OK! 200
If this response occurs, it will return the game with the provided ID.

Example of response:
```
{
    "game": {
        "_id": "646e75c0ee48bc8e9019783f",
        "title": "Counter-Strike: Global Offensive",
        "year": 2012,
        "price": 0,
        "__v": 0
    }
```
##### Bad Request! 400
If this response occurs, it means that no game was found in the database.
Reasons: Invalid ID

Example of Response : 

```
{
    "error": "Invalid Id"
}
```

### POST /game
This endpoint is responsible for inserting a game into the database.
#### Parameters
title: Title of the game.
price: Price of the game.
year:  Release year of the game.
Example:
```
{"title": "Pokemon Scarlet",
"price": 300,
"year":  "2022"}
```
#### Responses 
##### OK! 200
If this response occurs, the game will be inserted into the database, and you will receive the information of the game that was inserted.

Example of response:
```
{
    "title": "Pokemon Scarlet",
    "year": 2022,
    "price": 300,
    "_id": "6476b237530a1ab8709f43c3",
    "__v": 0
}
```
##### Bad Request! 400
If this response occurs, it means that some data was incomplete.
Reasons: Undefined title, price or year.

Example of Response : 

```
{
    "error": "Incomplete Data"
}
```

### DELETE /game/:id
This endpoint is responsible for deleting a game from the database.
#### Parameters
ID: Id of the game registered in the database.
Example:
```
"_id": "6476b237530a1ab8709f43c3"
```
#### Responses 
##### OK! 200
If this response occurs, it means that the game has been deleted from the database.

Example of response:
```
OK
```
##### Bad Request! 400
If this response occurs, it means that the ID is invalid.
Reasons: Invalid Id.

Example of Response : 

```
{
    "error": "Invalid Id"

}
```



### PUT /game/:id
This endpoint is responsible for editing a game.
#### Parameters
ID: Id of the game registered in the database.
Example:
```
"_id": "6476b237530a1ab8709f43c3"
```
#### Responses 
##### OK! 200
If this response occurs, it means that the game has been updated in the database.

Example of response:
```
{
    "_id": "646e7481ee48bc8e9019783b",
    "title": "Overwatch",
    "year": 2022,
    "price": 0,
    "__v": 0
}
```
##### Bad Request! 400
If this response occurs, it means that the ID is invalid or no data was provided for updating..
Reasons: Invalid Id or no data was provided for updating..

Example of Response : 

```
{
    "error": "Invalid Id"
}
{
    "error": "No data provided for update"
}

```





