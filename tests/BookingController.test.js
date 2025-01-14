const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const bookingRoutes = require('../routes/bookingRoutes');
const { rooms, bookings } = require('../data/storage');

const app = express();
app.use(bodyParser.json());
app.use('/api', bookingRoutes);

describe('Booking API', () => {
  beforeEach(() => {
    rooms.forEach(room => room.bookings = []);
    bookings.length = 0;
  });

  test('should book a room', async () => {
    const response = await request(app)
      .post('/api/book')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        checkInDate: '2023-12-01',
        checkOutDate: '2023-12-05'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Booking confirmed');
    expect(response.body.booking.name).toBe('John Doe');
  });

  test('should get booking details', async () => {
    await request(app)
      .post('/api/book')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        checkInDate: '2023-12-01',
        checkOutDate: '2023-12-05'
      });

    const response = await request(app)
      .get('/api/booking/john.doe@example.com');

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Doe');
  });

  test('should get all guests', async () => {
    await request(app)
      .post('/api/book')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        checkInDate: '2023-12-01',
        checkOutDate: '2023-12-05'
      });

    const response = await request(app)
      .get('/api/guests');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe('John Doe');
  });

  test('should cancel a booking', async () => {
    await request(app)
      .post('/api/book')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        checkInDate: '2023-12-01',
        checkOutDate: '2023-12-05'
      });

    const response = await request(app)
      .delete('/api/cancel')
      .send({
        email: 'john.doe@example.com',
        roomNumber: 101
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Booking cancelled');
  });

  test('should modify a booking', async () => {
    await request(app)
      .post('/api/book')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        checkInDate: '2023-12-01',
        checkOutDate: '2023-12-05'
      });

    const response = await request(app)
      .put('/api/modify')
      .send({
        email: 'john.doe@example.com',
        checkInDate: '2023-12-02',
        checkOutDate: '2023-12-06'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Booking modified');
    expect(response.body.booking.checkInDate).toBe('2023-12-02T00:00:00.000Z');
    expect(response.body.booking.checkOutDate).toBe('2023-12-06T00:00:00.000Z');
  });
});