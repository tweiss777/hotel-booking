import { Request, Response, NextFunction } from "express";
import HotelGuest from "../Models/HotelGuest.model";
import dayjs from "dayjs";
import Guest from "../Models/Guest.model";
import Hotel from "../Models/Hotel.Model";
import sequelize from "sequelize";
export class BookingController {
  private readonly hotelGuest: typeof HotelGuest;
  private readonly uuid: () => string;

  constructor(hotelGuest: typeof HotelGuest, uuid: () => string) {
    this.uuid = uuid;
    this.hotelGuest = hotelGuest;
  }

  getBookings = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = await this.hotelGuest.findAll({
        attributes: [
          "id",
          "reserveDate",
          "checkoutDate",
          "lastUpdated",
          "guestId",
          "hotelId",
          [sequelize.col("hotel.name"), "hotelName"],
          [sequelize.col("guest.firstName"), "firstName"],
          [sequelize.col("guest.lastName"), "lastName"],
        ],
        include: [
          {
            model: Hotel,
            as: "hotel",
            attributes: ["name"],
          },
          {
            model: Guest,
            as: "guest",
            attributes: ["firstName", "lastName"],
          },
        ],
      });
      res.status(200).send({ booking }).end();
    } catch (err) {
      next(err);
    }
  };

  getBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { booking_id } = req.params;
      const booking = await this.hotelGuest.findOne({
        attributes: [
          "id",
          "reserveDate",
          "checkoutDate",
          "lastUpdated",
          "guestId",
          "hotelId",
          [sequelize.col("hotel.name"), "hotelName"],
          [sequelize.col("guest.firstName"), "firstName"],
          [sequelize.col("guest.lastName"), "lastName"],
        ],
        where: { id: booking_id },
        include: [
          {
            model: Hotel,
            as: "hotel",
            attributes: ["name"],
          },
          {
            model: Guest,
            as: "guest",
            attributes: ["firstName", "lastName"],
          },
        ],
      });
      res.status(200).send({ booking }).end();
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
      const bookings = await this.hotelGuest.findAll({
        attributes: [
          "id",
          "reserveDate",
          "checkoutDate",
          "lastUpdated",
          "guestId",
          "hotelId",
          [sequelize.col("hotel.name"), "hotelName"],
          [sequelize.col("guest.firstName"), "firstName"],
          [sequelize.col("guest.lastName"), "lastName"],
        ],
        where: { guestId: guest_id },
        include: [
          {
            model: Hotel,
            as: "hotel",
            attributes: ["name"],
          },
          {
            model: Guest,
            as: "guest",
            attributes: ["firstName", "lastName"],
          },
        ],
      });
      res.status(200).send({ bookings }).end();
    } catch (err) {
      next(err);
    }
  };

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reserveDate = dayjs(req.body.reserve_date);
      const checkoutDate = dayjs(req.body.checkout_date);
      // convert to dto
      const newBooking = {
        id: this.uuid(),
        hotelId: req.body.hotel_id,
        guestId: req.body.hotel_guest_id,
        lastUpdated: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        reserveDate: reserveDate.format("YYYY-MM-DD HH:mm:ss"),
        checkoutDate: checkoutDate.format("YYYY-MM-DD HH:mm:ss"),
      };

      const booking = await this.hotelGuest.create(newBooking);

      res.status(201).send({ booking }).end();
    } catch (error) {
      next(error);
    }
  };
}
