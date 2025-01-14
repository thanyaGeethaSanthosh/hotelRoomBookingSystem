const Room = require('../models/Room');
const Booking = require('../models/Booking');

describe('Booking', () => {
  let room;

  beforeEach(() => {
    room = new Room(101);
  });

  test('should create a booking', () => {
    const checkInDate=new Date('2023-12-01')
    const checkOutDate=new Date('2023-12-05')
    const booking = Booking.createBooking('John Doe', 'john.doe@example.com', checkInDate, checkOutDate, room);
    expect(booking.name).toBe('John Doe');
    expect(booking.email).toBe('john.doe@example.com');
    expect(booking.checkInDate).toEqual(checkInDate);
    expect(booking.checkOutDate).toEqual(checkOutDate);
    expect(booking.roomNumber).toBe(101);
    expect(room.bookings).toContain(booking);
  });
});