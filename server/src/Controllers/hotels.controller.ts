import { Request, Response, NextFunction } from "express";
import Hotel from "../Models/Hotel.Model";
import NewHotelDTO from "../dtos/new-hotel.dto";
export class HotelsController {
  private readonly hotels: typeof Hotel;
  private readonly uuid: () => string;

  constructor(hotels: typeof Hotel, uuid: () => string) {
    this.hotels = hotels;
    this.uuid = uuid;
  }
  getHotels = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const hotels = await this.hotels.findAll();
      res.status(200).send({ hotels }).end();
    } catch (err) {
      next(err);
    }
  };

  createHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, address, rating } = req.body;
      const id = this.uuid();
      const hotel = await this.hotels.create({ id, name, address, rating });
        const newHotel: NewHotelDTO = {
                id: hotel?.id,
                name: hotel?.name,
                address: hotel?.address,

            }
      res.status(201).send({ hotel: newHotel }).end();
    } catch (err) {
      next(err);
    }
  };

  getHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: hotelId } = req.params;
      const hotel = await this.hotels.findOne({ where: { id: hotelId } });
      res.status(200).send({ hotel }).end();
    } catch (err) {
      next(err);
    }
  };
}
