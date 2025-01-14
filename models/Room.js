class Room {
  constructor(roomNumber) {
    this.roomNumber = roomNumber;
    this.bookings = [];
  }

  isAvailable(checkInDate, checkOutDate) {
    let foundAvailability = true;
    this.bookings.some(booking => {
      const isBooked = checkInDate >= booking.checkInDate && checkInDate < booking.checkOutDate
        || checkOutDate > booking.checkInDate && checkOutDate <= booking.checkOutDate
        || checkInDate < booking.checkInDate && checkOutDate > booking.checkOutDate;

      if (isBooked) {
        foundAvailability = false;
        return true;
      }
    });
    return foundAvailability;
  }

  addBooking(booking) {
    this.bookings.push(booking);
    this.bookings.sort((a, b) => a.checkInDate - b.checkInDate);
  }

  removeBooking(email) {
    this.bookings = this.bookings.filter(b => b.email !== email);
  }
}

module.exports = Room;