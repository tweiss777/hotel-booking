import { Request, Response, NextFunction } from "express";
import NewHotelDTO from "../dtos/hotels/new-hotel.dto";
import GetHotelDTO from "../dtos/hotels/get-hotel.dto";
import HotelRepository from "../Repositories/Hotel.repository";
import { ValidateSchema } from "../Validations/Validation.decorator";
export class HotelsController {
  private readonly uuid: () => string;
  private readonly hotelRepository: HotelRepository;
  constructor(hotelRepository: HotelRepository, uuid: () => string) {
    this.uuid = uuid;
    this.hotelRepository = hotelRepository;
    this.createHotel = this.createHotel.bind(this);
  }
  getHotels = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const hotels = await this.hotelRepository.GetHotels();
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

  @ValidateSchema("Hotel")
  async createHotel(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, address } = req.body;
      const id = this.uuid();
      const newHotel = {
        id,
        name,
        address,
        rating: 100,
      };

      const hotel = await this.hotelRepository.CreateHotel(newHotel);
      const newHotelDto: NewHotelDTO = {
        id: hotel?.id,
        name: hotel?.name,
        address: hotel?.address,
      };
      res.status(201).send({ hotel: newHotelDto }).end();
    } catch (err) {
      next(err);
    }
  }

  getHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: hotelId } = req.params;
      const hotel = await this.hotelRepository.GetHotel(hotelId);
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
