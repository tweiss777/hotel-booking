import { Request, Response, NextFunction } from "express";
import CreateGuestDto from "../dtos/guests/create-guest.dto";
import GuestDto from "../dtos/guests/guest.dto";
import NewGuestDto from "../dtos/guests/new-guest.dto";
import GuestRepository from "../Repositories/Guest.repository";
export class GuestController {
  private readonly uuid: () => string;
  private readonly guestRepository: GuestRepository;
  constructor(
    guestRepository: GuestRepository,
    uuid: () => string,
  ) {
    this.uuid = uuid;
    this.guestRepository = guestRepository;
  }

  getGuests = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const guests = await this.guestRepository.GetGuests();
      if (guests.length) {
        const guestsDto: GuestDto[] = guests.map((guest) => ({
          id: guest?.id,
          firstName: guest?.firstName,
          lastName: guest?.lastName,
          address: guest?.address,
        }));
        res.status(200).send({ guests: guestsDto }).end();
        return;
      }
      res.status(404).send({ guests: [] }).end();
    } catch (err) {
      next(err);
    }
  };

  getGuest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: guestId } = req.params;
      const guest = await this.guestRepository.GetGuest(guestId);
      if (guest) {
        const guestDto: GuestDto = {
          id: guest?.id,
          firstName: guest?.firstName,
          lastName: guest?.lastName,
          address: guest?.address,
        };
        res.status(200).send({ guest: guestDto }).end();
        return;
      }
      res.status(404).send({ guest: null }).end();
    } catch (err) {
      next(err);
    }
  };
  createGuest = async (
    req: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { firstName, lastName, address }: CreateGuestDto = req.body;
      const id = this.uuid();
      const guest = await this.guestRepository.CreateGuest({
        id,
        firstName,
        lastName,
        address,
      });

      const newGuest: NewGuestDto = {
        id: guest?.id,
        firstName: guest?.firstName,
        lastName: guest?.lastName,
        address: guest?.address,
      };

      response.status(201).send({ guest: newGuest }).end();
    } catch (err) {
      next(err);
    }
  };
}
