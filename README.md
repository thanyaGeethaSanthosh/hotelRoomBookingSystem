# Hotel Room Booking System

## Overview
The **Hotel Room Booking System** is a RESTful API designed to manage hotel room bookings efficiently. It allows users to book rooms, view and manage their bookings, and modify or cancel their reservations. The system automatically assigns rooms based on availability and provides comprehensive booking details.

---

## How to Run Locally

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install [Postman](https://www.postman.com/) or use `curl` for API testing.

### Steps
1. Clone the repository:
   ```bash
   git clone git@github.com:thanyaGeethaSanthosh/hotelRoomBookingSystem.git
   cd hotelRoomBookingSystem
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. The API will be available at `http://localhost:3000`.

---

## Running Tests

1. Run the test suite:
   ```bash
   npm test
   ```
2. Ensure all test cases pass successfully.

---

## Features

### Booking Room API
- **Endpoint**: `POST /api/book`
- **Description**: Users can book a room by providing their name, email, check-in date, and check-out date.

### View Booking Details API
- **Endpoint**: `GET /api/booking/:email`
- **Description**: Retrieve booking details for a guest using their email address.

### View All Guests in the Hotel API
- **Endpoint**: `GET /api/guests`
- **Description**: Return a list of all guests currently staying in the hotel, including their room numbers.

### Modify Booking API
- **Endpoint**: `PUT /api/modify`
- **Description**: Allow guests to modify their check-in or check-out dates by providing their email and updated booking details.

### Cancel Room Booking API
- **Endpoint**: `DELETE /api/cancel`
- **Description**: Allow guests to cancel their booking by providing their email and room details.

---

## API Endpoints

### Booking Room
```bash
curl --location 'http://localhost:3000/api/book' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "checkInDate": "2023-10-01",
  "checkOutDate": "2023-10-05"
}'
```

response
```json
{
    "message": "Booking confirmed",
    "booking": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "checkInDate": "2023-10-01T00:00:00.000Z",
        "checkOutDate": "2023-10-05T00:00:00.000Z",
        "roomNumber": 101
    }
}
```

### View All Guests
```bash
curl --location 'http://localhost:3000/api/guests'
```
response
```json
[
     {
        "name": "John Doe",
        "roomNumber": 101,
        "checkInDate": "2023-10-01T00:00:00.000Z",
        "checkOutDate": "2023-10-05T00:00:00.000Z"
    }
]
```
### View Booking Details
```bash
curl --location 'http://localhost:3000/api/booking/john.doe@example.com'
```
response
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "checkInDate": "2023-10-01T00:00:00.000Z",
    "checkOutDate": "2023-10-05T00:00:00.000Z",
    "roomNumber": 101
}
```
### Modify Booking
```bash
curl --location --request PUT 'http://localhost:3000/api/modify' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "john.doe@example.com",
  "checkInDate": "2023-10-06",
  "checkOutDate": "2023-10-06"
}'
```
response
```json
{
    "message": "Booking modified",
    "booking": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "checkInDate": "2023-10-06T00:00:00.000Z",
        "checkOutDate": "2023-10-06T00:00:00.000Z",
        "roomNumber": 101
    }
}
```
### Cancel Booking
```bash
curl --location --request DELETE 'http://localhost:3000/api/cancel' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "john.doe@example.com",
  "roomNumber": 101
}'
```

response
```json
{
    "message": "Booking cancelled"
}
```
---

## Notes
- This project uses in-memory storage for simplicity.
- The API responses are in JSON format, making it easy to integrate with front-end applications.
