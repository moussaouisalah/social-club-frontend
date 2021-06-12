# CLUB SOCIAL MEDIA FRONTEND

## TODO

- add toggle like
- add create post
- add post page
- add create comment

- change all dataproviders
- add error logger (method from app passed to children or context)
- add photos
- add invite to club
- add accept / refuse member

- add file instead of just photo
- add phone sidebar

# ENDPOINTS

## USERS

GET /users
URL_PARAMS {
skip?: int, // pagination offset
take?: int, // pagination number
ids?: int[] // get users by id
}

GET /users/:id

POST /users
BODY_PARAMS {

}

PUT /users/:id
BODY_PARAMS {
firstName?: string,
lastName?: string,
email?: string,
profileImage?: image,
coverImage?: image
}

DELETE /users/:id

## AUTH

POST /changepassword
BODY_PARAMS {
newPassword: string
}

POST /login
BODY_PARAMS {
email: string,
password: string
}

POST /signup
// TODO

## POSTS

GET /posts
URL_PARAMS {
userId?: int, // get user posts in all clubs
clubId?: int, // get club posts
skip?: int, // pagination offset
take?: int, // pagination number
}

POST /posts
BODY_PARAMS {
clubId: int,
// TODO
}

## CLUBS

GET /clubs
URL_PARAMS {
skip?: int, // pagination offset
take?: int, // pagination number
ids: int, // get users by id
}

GET /clubs/:id

POST /clubs
BODY_PARAMS {
name: string,
primaryColor: string,
profileImage?: image,
coverImage?: image
}

PUT /clubs/:id
BODY_PARAMS {
name?: string,
primaryColor?: string,
profileImage?: image,
coverImage?: image
}

DELETE /clubs/:id

## ROLES

GET /roles
URL_PARAMS {
clubId: int
}

GET /roles/:id

// TODO

GET /members
URL_PARAMS {
userId?: int, // get user's memberships
clubId?: int, // get club members
}

// TODO

# DATA TYPES

"users":
{
"firstName": "Salaheddine",
"lastName": "Moussaoui",
"email": "salah.moussaoui@outlook.com",
"password": "topSecret123", // BACKEND ONLY
"profileImage": "",
"coverImage": "",
"id": 1
}

"clubs":
{
"name": "IEEE ENSA Fès",
"primaryColor": "#ff5722",
"profileImage": "",
"coverImage": "",
"id": 1
}

"posts":
{
"id": 1,
"text": "hello",
"image": "",
"creationDateTime": "",
"userId": 1,
"clubId": 1
}

"roles":
{
"id": 1,
"name": "Editeur",
"canInvite": true,
"canRemove": true,
"canPost": true,
"canEdit": true,
"isDefault": true,
"clubId": 1
}

"members":
{
"userId": 1,
"clubId": 1,
"type": "member", // TYPES: "member", "admin"
"roleId": 1
}

"auth":
{
"token": "oijrpekg",
}
