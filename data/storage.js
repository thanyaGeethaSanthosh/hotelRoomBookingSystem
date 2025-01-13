const { TOTAL_ROOMS, ROOM_NUMBERS } = require('../config/constants');
const Room = require('../models/Room');

// Create room instances based on ROOM_NUMBERS
const rooms = ROOM_NUMBERS.map(roomNumber => new Room(roomNumber));

// Array to store booking information
const bookings = [];

module.exports = { rooms, bookings };
