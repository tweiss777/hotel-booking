import express from "express";
import { BookingController } from "../Controllers/booking.controller";
import HotelGuest from "../Models/HotelGuest.model";
import { v4 } from "uuid";
import BookingRepository from "../Repositories/Booking.repository";
import Hotel from "../Models/Hotel.Model";
import Guest from "../Models/Guest.model";


const router = express.Router();

const bc = new BookingController(new BookingRepository(HotelGuest, Hotel, Guest), v4);


router.route('/:booking_id').get(bc.getBooking)
router.route('/get-by-user/:guest_id').get(bc.getBookingsByUser)
router.route('/').post(bc.createBooking)
router.route('/').get(bc.getBookings)




export default router
