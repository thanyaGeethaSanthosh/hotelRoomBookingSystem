const express = require('express');
const BookingController = require('../controllers/BookingController');

const router = express.Router();

router.post('/book', BookingController.bookRoom);
router.get('/booking/:email', BookingController.getBookingDetails);
router.get('/guests', BookingController.getAllGuests);
router.delete('/cancel', BookingController.cancelBooking);
router.put('/modify', BookingController.modifyBooking);

module.exports = router;