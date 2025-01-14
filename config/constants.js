const TOTAL_ROOMS = 10;
// Generate room numbers dynamically based on the total number of rooms starting from 101
const ROOM_NUMBERS = Array.from({ length: TOTAL_ROOMS }, (_, i) => i + 101);

const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

const ERROR_MESSAGES = {
  BOOKING_CONFIRMED: 'Booking confirmed',
  NO_ROOMS_AVAILABLE: 'No rooms available',
  BOOKING_NOT_FOUND: 'Booking not found',
  BOOKING_CANCELLED: 'Booking cancelled',
  BOOKING_MODIFIED: 'Booking modified',
}

module.exports = {
  TOTAL_ROOMS,
  ROOM_NUMBERS,
  STATUS_CODES,
  ERROR_MESSAGES
};