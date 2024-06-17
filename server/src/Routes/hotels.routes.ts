import express from 'express';
import { HotelsController  } from '../Controllers/hotels.controller';
import Hotel from '../Models/Hotel.Model';
import { v4 } from 'uuid';
import HotelRepository from '../Repositories/Hotel.repository';
const router = express.Router()

const hc = new HotelsController(new HotelRepository(Hotel), v4)

router.route('/').get(hc.getHotels);
router.route('/').post(hc.createHotel);
router.route('/:id').get(hc.getHotel);
export default router
