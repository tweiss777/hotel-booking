import { Request, Response, NextFunction } from "express";
import Hotel from "../Models/Hotel.Model";
import NewHotelDTO from "../dtos/hotels/new-hotel.dto";
import { GetHotelDTO } from "../dtos/hotels/get-hotel.dto";
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
      if (!hotels.length) {
        res.send({ hotels: [] }).end();
        return;
      }
      const hotelsDTO: GetHotelDTO[] = hotels.map((hotel) => ({
        id: hotel?.id,
        name: hotel?.name,
        address: hotel?.address,
        rating: hotel?.rating,
        img_url: hotel?.img_url,
      }));
      res.status(200).send({ hotels: hotelsDTO }).end();
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
      };
      res.status(201).send({ hotel: newHotel }).end();
    } catch (err) {
      next(err);
    }
  };

  getHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: hotelId } = req.params;
      const hotel = await this.hotels.findOne({ where: { id: hotelId } });
      if (!hotel) {
        res.status(404).send({ hotel: null }).end();
        return;
      }
      const hotelDTO: GetHotelDTO = {
        id: hotel?.id,
        name: hotel?.name,
        address: hotel?.address,
        rating: hotel?.rating,
        img_url: hotel?.img_url,
      };
      res.status(200).send({ hotel: hotelDTO }).end();
    } catch (err) {
      next(err);
    }
  };
}
