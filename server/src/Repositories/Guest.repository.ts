import Guest from "../Models/Guest.model";

export default class GuestRepository {
  private readonly guest: typeof Guest;

  constructor(guest: typeof Guest) {
    this.guest = guest;
  }

  public async GetGuest(id: string): Promise<Guest | null> {
    try {
      return await this.guest.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  public async GetGuests(): Promise<Guest[]> {
    try {
      return await this.guest.findAll();
    } catch (error) {
      throw error;
    }
  }

  public async CreateGuest({ id, firstName, lastName, address }) {
    try {
      const newGuest = await this.guest.create({
        id,
        firstName,
        lastName,
        address,
      });
      return newGuest;
    } catch (error) {
      throw error;
    }
  }
}
