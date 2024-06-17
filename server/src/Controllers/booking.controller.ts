import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import BookingDTO from "../dtos/booking/booking.dto";
import NewBookingDTO from "../dtos/booking/new-booking.dto";
import BookingRepository from "../Repositories/Booking.repository";
export class BookingController {
  private readonly bookingRepository: BookingRepository;
  private readonly uuid: () => string;

  constructor(bookingRepository: BookingRepository, uuid: () => string) {
    this.uuid = uuid;
    this.bookingRepository = bookingRepository;
  }

  getBookings = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.bookingRepository.GetBookings() 
      const bookingsDto: BookingDTO[] = bookings.map((booking) => ({
        id: booking?.id,
        reserveDate: booking?.reserveDate,
        checkoutDate: booking?.checkoutDate,
        lastUpdated: booking?.lastUpdated,
        guestId: booking?.guestId,
        hotelId: booking?.hotelId,
        hotel: {
          name: booking?.hotel?.name,
        },
        guest: {
          firstName: booking?.guest?.firstName,
          lastName: booking?.guest?.lastName,
        },
      }));

      res.status(200).send({ booking: bookingsDto }).end();
    } catch (err) {
      next(err);
    }
  };

  getBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { booking_id } = req.params;
      const booking = await this.bookingRepository.GetBooking(booking_id); 
      if (!booking) {
        res.status(404).send({ booking: null }).end();
        return;
      }
      const bookingDTO: BookingDTO = {
        id: booking?.id,
        reserveDate: booking?.reserveDate,
        checkoutDate: booking?.checkoutDate,
        lastUpdated: booking?.lastUpdated,
        guestId: booking?.guestId,
        hotelId: booking?.hotelId,
        hotel: {
          name: booking?.hotel?.name,
        },
        guest: {
          firstName: booking?.guest?.firstName,
          lastName: booking?.guest?.lastName,
        },
      };
      res.status(200).send({ booking: bookingDTO }).end();
    } catch (err) {
      next(err);
    }
  };

  getBookingsByUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { guest_id } = req.params;
      const bookings = await this.bookingRepository.GetBookingsByUser(guest_id);
      const bookingDto: BookingDTO[] = bookings.map((booking) => ({
        id: booking?.id,
        reserveDate: booking?.reserveDate,
        checkoutDate: booking?.checkoutDate,
        lastUpdated: booking?.lastUpdated,
        guestId: booking?.guestId,
        hotelId: booking?.hotelId,
        hotel: {
          name: booking?.hotel?.name,
        },
        guest: {
          firstName: booking?.guest?.firstName,
          lastName: booking?.guest?.lastName,
        },
      }));
      res.status(200).send({ bookings: bookingDto }).end();
    } catch (err) {
      next(err);
    }
  };

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reserveDate = dayjs(req.body.reserve_date);
      const checkoutDate = dayjs(req.body.checkout_date);

      const newBooking = {
        id: this.uuid(),
        hotelId: req.body.hotel_id,
        guestId: req.body.hotel_guest_id,
        lastUpdated: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        reserveDate: reserveDate.format("YYYY-MM-DD HH:mm:ss"),
        checkoutDate: checkoutDate.format("YYYY-MM-DD HH:mm:ss"),
      };

      const booking = await this.bookingRepository.CreateBooking(newBooking) 

      const newBookingDto: NewBookingDTO = {
        id: booking.id,
        hotelId: booking.hotelId,
        guestId: booking.guestId,
        reserveDate: booking.reserveDate,
        checkoutDate: booking.checkoutDate,
      };

      res.status(201).send({ booking: newBookingDto }).end();
    } catch (error) {
      next(error);
    }
  };
}
