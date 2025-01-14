class Booking {
  constructor(name, email, checkInDate, checkOutDate, roomNumber) {
    this.name = name;
    this.email = email;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.roomNumber = roomNumber;
  }

  static createBooking(name, email, checkInDate, checkOutDate, room) {
    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      throw new Error('Invalid date');
    }
    if (checkInDate >= checkOutDate) {
      throw new Error('Check-in date must be before check-out date');
    }
    const booking = new Booking(name, email, checkInDate, checkOutDate, room.roomNumber);
    room.addBooking(booking);
    return booking;
  }
}

module.exports = Booking;