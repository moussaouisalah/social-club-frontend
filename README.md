# CLUB SOCIAL MEDIA FRONTEND

## TODO

- add accept / refuse member

- add photos
- add file instead of just photo (also change name of attribute)

- change all dataproviders
- add events

- add error logger (method from app passed to children or context)
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

POST /users //signup
BODY_PARAMS {
firstName: string,
lastName: string,
email: string,
password: string
profileImage?: image,
coverImage?: image
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
text: string,
file: file,
}

GET /posts/:id

POST /posts/:id/like

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

POST /roles
BODY_PARAMS {
name: string,
canInvite: boolean,
canRemove: boolean,
canPost: boolean,
canEdit: boolean,
}

GET /roles/:id

PUT /roles/:id
BODY_PARAMS {
name: string,
canInvite: boolean,
canRemove: boolean,
canPost: boolean,
canEdit: boolean,
}

DELETE /roles/:id

## MEMBERS

GET /members
URL_PARAMS {
userId?: int, // get user's memberships
clubId?: int, // get club members
}

// TODO

## COMMENTS

// TODO

## MISC

/search
URL_PARAMS {
name: string
}
RETURNS {
users: [],
clubs: []
}

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
