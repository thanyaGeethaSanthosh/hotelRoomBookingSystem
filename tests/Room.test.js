const Room = require('../models/Room');
const Booking = require('../models/Booking');

describe('Room', () => {
  let room;

  beforeEach(() => {
    room = new Room(101);
  });

  test('should add a booking', () => {
    const booking = new Booking('John Doe', 'john.doe@example.com', new Date('2023-12-01'), new Date('2023-12-05'), room);
    room.addBooking(booking);
    expect(room.bookings).toContain(booking);
  });

  test('should remove a booking', () => {
    const booking = new Booking('John Doe', 'john.doe@example.com', new Date('2023-12-01'), new Date('2023-12-05'), room);
    room.addBooking(booking);
    room.removeBooking('john.doe@example.com');
    expect(room.bookings).not.toContain(booking);
  });

  test('should check availability correctly', () => {
    const booking1 = new Booking('John Doe', 'john.doe@example.com', new Date('2023-12-01'), new Date('2023-12-05'), room);
    const booking2 = new Booking('Jane Doe', 'jane.doe@example.com', new Date('2023-12-06'), new Date('2023-12-10'), room);
    room.addBooking(booking1);
    room.addBooking(booking2);

    expect(room.isAvailable(new Date('2023-12-05'), new Date('2023-12-06'))).toBe(true);
    expect(room.isAvailable(new Date('2023-12-04'), new Date('2023-12-07'))).toBe(false);
  });

  test('should handle no bookings', () => {
    expect(room.isAvailable(new Date('2023-12-01'), new Date('2023-12-05'))).toBe(true);
  });

  test('should handle back-to-back bookings', () => {
    const booking1 = new Booking('John Doe', 'john.doe@example.com', new Date('2023-12-01'), new Date('2023-12-05'), room);
    room.addBooking(booking1);

    expect(room.isAvailable(new Date('2023-12-05'), new Date('2023-12-10'))).toBe(true);
    expect(room.isAvailable(new Date('2023-12-04'), new Date('2023-12-05'))).toBe(false);
  });

  test('should handle overlapping bookings', () => {
    const booking1 = new Booking('John Doe', 'john.doe@example.com', new Date('2023-12-01'), new Date('2023-12-05'), room);
    room.addBooking(booking1);

    expect(room.isAvailable(new Date('2023-12-03'), new Date('2023-12-06'))).toBe(false);
  });
});