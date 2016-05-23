Dashboard API
============

Endpoints
-------------

All endpoints that use {user} param need a token header.
´Authentication Bearer token´

Endpoint       | Method | Fields | Description
-------------- | ------ | ------ | -----------
/api/users     | POST   | name,email,username, password   | Sign up
/api/users/auth| POST   | email or username, password     | Log in
/api/users/{user}     | PATCH  | name, email, username, password | Update user data
/api/users/{user}/devices   | POST   | name, description, type | Create new device
/api/users/{user}/devices   | GET    |  | Get devices by owner
/api/users/{user}/devices/{device}   | PATCH  | name, description, type | Update device data
/api/users/{user}/devices/{device}   | DELETE  |  | Delete device
/api/users/{user}/devices/{device}/nodes   | POST   | name, description, type | Create new device
/api/users/{user}/devices/{device}/nodes   | GET    |  | Get nodes by device
/api/users/{user}/devices/{device}/nodes/{node}   | PATCH  | name, description, type | Update node props
/api/users/{user}/devices/{device}/nodes/{node}   | DELETE  |  | Delete node