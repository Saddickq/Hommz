[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![MongoDB](https://img.shields.io/badge/MongoDB-black.svg?logo=mongodb)
![ExpressJs](https://img.shields.io/badge/Express-black.svg?logo=nodedotjs)
![React](https://img.shields.io/badge/React-black.svg?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-black.svg?logo=node.js)
![JavaScript](https://img.shields.io/badge/JavaScript-black.svg?logo=javascript)


<div style="display: flex; justify-content: center; align-items: center; width: 100%; gap: 45px;">
   <img style="width: 350px;" src="https://res.cloudinary.com/dh9q1rj0k/image/upload/v1721342993/Screenshot_from_2024-07-18_22-31-00_duqcue.png" alt="Screenshot 1">
   <img style="width: 350px;" src="https://res.cloudinary.com/dh9q1rj0k/image/upload/v1721342993/Screenshot_from_2024-07-18_22-41-30_sjmsiz.png" alt="Screenshot 2">
</div>

# Hommz

Hommz is a comprehensive full stack web application designed to seamlessly connect landlords with potential tenants, serving as a modern solution akin to an Airbnb clone. The platform simplifies the rental process by offering an intuitive interface for landlords to list their properties and for tenants to search and book accommodations. 

Hommz aims to enhance the rental experience for both parties. Whether you're a landlord looking to fill vacancies or a tenant in search of your next home, Hommz bridges the gap, making the rental process efficient and hassle-free.

## Features

- Responsive design
- User authentication
- User authorization
- Property Listings
- Booking and Reservations
- Dynamic Pricing

## Tech Stack

**Client:** React, Node, JavaScript

**Server:** Node, Express, JavaScript, MongoDB, Cloudinary, Multer

**Deployment:** Netlify, Render

## Installation

Clone the repository
```bash
  git clone https://github.com/Saddickq/Hommz.git
```

Navigate into the project directory
```bash
  cd Hommz
```

Install backend dependencies
```bash
  cd server
  npm install
```

Install frontend dependencies
```bash
  cd ../client
  npm install
```

Start the backend server
```bash
  cd ../server
  npm start
```

Start the frontend development server
```bash
  cd ../client
  npm start
```

#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL`
`SECRET`
`PORT`
`NODE_ENV`
`cloud_name`
`api_key`
`api_secret`

## API References

#### Register

```http
  POST /auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. Your email   |
| `name`    | `string` | **Required**. Your name    |
| `password`| `string` | **Required**. Your password|

#### Login

```http
  GET /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. Your email   |
| `password`| `string` | **Required**. Your password|

#### Logout

```http
  GET /auth/logout
```

#### Create place

```http
  POST /new_place
```

| Parameter    | Type      | Description                                         |
| :----------- | :-------  | :-------------------------------------------------- |
| `title`      | `string`  | **Required**. Title of the place                    |
| `description`| `string`  | **Required**. Description of the place              |
| `address`    | `string`  | **Required**. Address of the place                  |
| `price`      | `number`  | **Required**. Price per night                       |
| `photos`     | `[string]`| **Required**. Array of photo URLs                   |
| `owner`      | `string`  | **Required**. User ID of the owner                  |
| `extraInfo`  | `string`  | **Optional**. Additional information about the place|

#### Get user Places

```http
  GET /user_places
```

#### Get all available Places

```http
  GET /places
```

#### Get Place

```http
  GET /places/:id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of place to fetch |

#### Update Place

```http
  PUT /places/:id
```
| Parameter    | Type      | Description                                         |
| :----------- | :-------  | :-------------------------------------------------- |
| `title`      | `string`  | **Required**. Title of the place                    |
| `description`| `string`  | **Required**. Description of the place              |
| `address`    | `string`  | **Required**. Address of the place                  |
| `price`      | `number`  | **Required**. Price per night                       |
| `photos`     | `[string]`| **Required**. Array of photo URLs                   |
| `extraInfo`  | `string`  | **Optional**. Additional information about the place|

#### Delete Place

```http
  DELETE /places/:id
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of place to fetch |

#### Create Booking

```http
  POST /bookings
```

| Parameter | Type      | Description                                     |
| :-------- | :-------- | :---------------------------------------------- |
| `checkIn` | `string`  | **Required**. Time to check In                  |
| `checkOut`| `string`  | **Required**. Time to check Out                 |
| `name`    | `string`  | **Required**. Name of person booking            |
| `price`   | `number`  | **Required**. Price per night                   |
| `phone`   | `string`  | **Required**. phone number of the person booking|
| `place`   | `string`  | **Required**. Id of the place being booked      |
| `user`    | `string`  | **Required**. Owner of the place                |

#### Get Bookings

```http
  GET /bookings
```

#### Delete Bookings

```http
  DELETE /bookings/:id
```

## Authors

- [Saddickq](https://github.com/Saddickq)