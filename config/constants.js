const TOTAL_ROOMS = 10;
// Generate room numbers dynamically based on the total number of rooms starting from 101
const ROOM_NUMBERS = Array.from({ length: TOTAL_ROOMS }, (_, i) => i + 101);

module.exports = {
  TOTAL_ROOMS,
  ROOM_NUMBERS,
};