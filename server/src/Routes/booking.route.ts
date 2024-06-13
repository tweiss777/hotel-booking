import express from "express";
const router = express.Router();
import { BookingController } from "../Controllers/booking.controller";
import HotelGuest from "../Models/HotelGuest.model";
import { v4 } from "uuid";
const hotelGuestModel = HotelGuest;


const bc = new BookingController(hotelGuestModel, v4);


router.route('/:booking_id').get(bc.getBooking)
router.route('/get-by-user/:guest_id').get(bc.getBookingsByUser)
router.route('/').post(bc.createBooking)
router.route('/').get(bc.getBookings)




export default router
