App Overview
The "Tip Manager" app allows users to calculate tips and store the calculations in a database. Users can sign up, log in, calculate tips, and retrieve tip.

Description
Store user details: name, profile picture, email, and password (mandatory fields).
Validate fields and return appropriate errors if any are missing.
Allow only one login per user. If a user is already logged in from another device, log them out from that device.
Store tip data, including the place, total amount paid, and time.
Backend APIs
POST /user: Create a user/Sign up

Request Body:
{
"name": "Jesse Pinkman",
"proPic": "(uploaded image)",
"email": "jessepinkman@gmail.com",
"password": "jessepinkman@123"
}
Response (HTTP Status 201):
{
"name": "Jesse Pinkman",
"token": "(JWT token)"
}
Handle invalid fields with response { "message": "invalid field (field name)" } and HTTP status 400.
POST /user/login: User login

Request Body:
{
"email": "jessepinkman@gmail.com",
"password": "jessepinkman@123"
}
Response (HTTP Status 200):
{
"name": "Jesse Pinkman",
"token": "(JWT token)"
}
Handle invalid credentials with response { "message": "Invalid credentials" } and HTTP status 401.
POST /tip/calculate: Calculate tip and store it

Request Body:
{
"place": "Hotel Marriot",
"totalAmount": 1000,
"tipPercentage": 15
}
Response (HTTP Status 200):
{
"tip": 150
}
GET /tip: Get user's tip records within a given date range

Query Parameters:

startDate (format: dd-mm-yyyy)
endDate (format: dd-mm-yyyy)
Response (HTTP Status 200):

[
{
"place": "Hotel Marriot",
"totalAmount": 1000,
"tipAmount": 150
},
{
"place": "ITC",
"totalAmount": 1000,
"tipAmount": 150
}
]
