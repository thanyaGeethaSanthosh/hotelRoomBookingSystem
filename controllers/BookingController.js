const { rooms, bookings } = require('../data/storage');
const Booking = require('../models/Booking');
const { STATUS_CODES, ERROR_MESSAGES } = require('../config/constants');

class BookingController {
    static bookRoom(req, res) {
        const { name, email, checkInDate, checkOutDate } = req.body;
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        let availableRoom = null;

        for (const room of rooms) {
            if (room.isAvailable(checkIn, checkOut)) {
                availableRoom = room;
                break;
            }
        }

        if (!availableRoom) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.NO_ROOMS_AVAILABLE });
        }

        const booking = Booking.createBooking(name, email, checkIn, checkOut, availableRoom);
        bookings.push(booking);

        res.status(STATUS_CODES.CREATED).json({ message: ERROR_MESSAGES.BOOKING_CONFIRMED, booking });
    }

    static getBookingDetails(req, res) {
        const { email } = req.params;
        const booking = bookings.find(b => b.email === email);

        if (!booking) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.BOOKING_NOT_FOUND });
        }

        res.status(STATUS_CODES.SUCCESS).json(booking);
    }
    static getAllGuests(req, res) {
        const guests = bookings.map(b => ({
            name: b.name,
            roomNumber: b.roomNumber,
            checkInDate: b.checkInDate,
            checkOutDate: b.checkOutDate
        }));

        res.status(STATUS_CODES.SUCCESS).json(guests);
    }

    static cancelBooking(req, res) {
        const { email, roomNumber } = req.body;
        const bookingIndex = bookings.findIndex(b => b.email === email && b.roomNumber === roomNumber);

        if (bookingIndex === -1) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.BOOKING_NOT_FOUND });
        }

        bookings.splice(bookingIndex, 1);
        const room = rooms.find(r => r.roomNumber === roomNumber);
        room.removeBooking(email);

        res.status(STATUS_CODES.SUCCESS).json({ message: ERROR_MESSAGES.BOOKING_CANCELLED });
    }

    static modifyBooking(req, res) {
        const { email, checkInDate, checkOutDate } = req.body;
        const booking = bookings.find(b => b.email === email);

        if (!booking) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.BOOKING_NOT_FOUND });
        }

        booking.checkInDate = new Date(checkInDate);
        booking.checkOutDate = new Date(checkOutDate);

        res.status(STATUS_CODES.SUCCESS).json({ message: ERROR_MESSAGES.BOOKING_MODIFIED, booking });
    }
}

module.exports = BookingController;