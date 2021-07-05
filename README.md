# CLUB SOCIAL MEDIA FRONTEND

## TODO

- userProvider (check getMany, create changePassword)
- clubProvider (check updateClub)
- memberProvider
- postProvider
- roleProvider
- commentProvider
- miscProvider
- add error logger (axios interceptor + context + toast)

# CLASSES

## USER

{
id: number;
firstName: string;
lastName: string;
email: string;
password: string; // server only
profileImage: string;
coverImage: string;
}

## CLUB

{
id: number;
name: string;
profileImage: string;
coverImage: string;
primaryColor: string;
}

## MEMBER

{
userId: number;
clubId: number;
type: MemberType; enum {member, requested, invited}
roleId: number;
}

## ROLE

{
id: number;
name: string;
isDefault: boolean;
canInvite: boolean;
canRemove: boolean;
canPost: boolean;
canEdit: boolean;
clubId: number;
}

## POST

{
id: number;
text: string;
image?: string;
creationDateTime: Date;
userId: number;
clubId: number;
}

## COMMENT

{
id: number;
text: string;
creationDateTime: Date;
postId: number;
userId: number;
}

# ENDPOINTS

## USER

### GET /users/:id

params:
id: number

description:
get user by id

return :
{
id: number;
firstName: string;
lastName: string;
email: string;
profileImage: string;
coverImage: string;
}

### GET /users

params:
ids: number[] | null

description:
get all users if ids == null
get users by ids if ids != null

return:
[
{
id: number;
firstName: string;
lastName: string;
email: string;
profileImage: string;
coverImage: string;
}
]

### PUT /users/:id

params:
url: id: number
body: {
firstName: string,
lastName: string,
email: string,
profileImage: image | undefined,
coverImage: image | undefined
}

description:
update user

return:
{
id: number;
firstName: string;
lastName: string;
email: string;
profileImage: string;
coverImage: string;
}

## CLUB

### GET /clubs/:id

params:
id: number

description:
get club by id

return:
{
id: number;
name: string;
profileImage: string;
coverImage: string;
primaryColor: string;
}

### GET /clubs

params:
ids: number[] | null

description:
get all clubs if ids == null
get clubs by ids if ids != null

return:
[
{
id: number;
name: string;
profileImage: string;
coverImage: string;
primaryColor: string;
}
]

### POST /clubs

params:
body: {
name: string;
primarycolor: string;
profileImage: image | undefined;
coverImage: image | undefined;
}

description:
create club

return:
{
id: number;
name: string;
profileImage: string;
coverImage: string;
primaryColor: string;
}

### PUT /clubs/:id

params:
{
name,
primaryColor,
profileImage: image | undefined,
coverImage: image | undefined,
}

description:
update club

return:
{
id: number;
name: string;
profileImage: string;
coverImage: string;
primaryColor: string;
}

## MEMBER

### GET /members

params:
url: {
userId: number | undefined;
clubId: number | undefined;
}

description:
if clubId != null return all members of club
if userId != null return all members of user

return:
[
{
userId: number;
clubId: number;
type: MemberType; enum {member, requested, invited}
roleId: number;
}
]

### PUT / members

params:
body: {
userId: number;
clubId: number;
newType: MemberType | undefined; enum {member, requested, invited, refused}
newRoleId: number | undefined;
}

description:
if newRoleId != null change the role of user to the new Id
(check permission first)
if newType != null change the type of member
(refused == delete member)
(check perm also)

return:
{
userId: number;
clubId: number;
type: MemberType; enum {member, requested, invited}
roleId: number;
}

## ROLE

### GET /roles/:id

params:
url: id: number

description:
get role by id

return:
{
id: number;
name: string;
isDefault: boolean;
canInvite: boolean;
canRemove: boolean;
canPost: boolean;
canEdit: boolean;
clubId: number;
}

### GET /roles

params:
url: clubId: number

description:
get all club roles

return:
[
{
id: number;
name: string;
isDefault: boolean;
canInvite: boolean;
canRemove: boolean;
canPost: boolean;
canEdit: boolean;
clubId: number;
}
]

### POST /roles

params:
body: {
name: string;
isDefault: boolean;
canInvite: boolean;
canRemove: boolean;
canPost: boolean;
canEdit: boolean;
clubId: number;
}

description:
create role

return:
{
id: number;
name: string;
isDefault: boolean;
canInvite: boolean;
canRemove: boolean;
canPost: boolean;
canEdit: boolean;
clubId: number;
}

## POST

### GET /posts

params:
url: {
userId: number | undefined;
clubId: number | undefined;
skip: number; // pagination
take: number; // pagination
}

description:
if userId != null return all posts made in clubs where user is a member
if clubId != null return all posts made in club
order by creationdate latest first

return:
[
{
id: number;
text: string;
image?: string;
creationDateTime: Date;
userId: number;
clubId: number;
}
]

### GET /posts/:id?isLikedBy

params:
url: {
isLikedBy: number;
}

description:
check if post is liked by user

return:
{
isLikedByUser: boolean;
}

### POST /posts/:id/like

params:

description:
toggle like by connected user
if liked then remove like
if not liked then like

return:
{
isLikedByUser: boolean;
}

### POST /posts

params:
body: {
text: string;
image: image | undefined;
clubId: number;
}

description:
create post

return:
{
id: number;
text: string;
image?: string;
creationDateTime: Date;
userId: number;
clubId: number;
}

## COMMENT

### GET /comments

params: postId: number;

description:
get all post comments

return:
[
{
id: number;
text: string;
creationDateTime: Date;
postId: number;
userId: number;
}
]

### POST /comments

params:
body: {
postId: number;
text: string;
}

description:
create comment on a post

return:
{
id: number;
text: string;
creationDateTime: Date;
postId: number;
userId: number;
}

## AUTH

### GET /auth/identity

params:

desc:
get user token from headers and return user

return:
{
id: number;
firstName: string;
lastName: string;
email: string;
profileImage: string;
coverImage: string;
}

### POST /auth/login

params:
body: {
email: string;
password: string;
}

desc:
login user and return token

return:
{
token: string | undefined;
}

### POST /auth/signup

params:
body: {
firstName: string;
lastName: string;
email: string;
password: string;
profileImage: string | undefined;
coverImage: string | undefined;
}
desc:
signup user and return token
return:
{
token: string | undefined;
}

## MISC

### GET /misc/search

params:
url: {
usersOnly: boolean;
query: string;
}

description:
search by name of clubs and users
if usersOnly search only users

return:
[
id: number;
type: SearchResultTypes; enum {Club, User}
name: string;
profileImage?: string;
]
