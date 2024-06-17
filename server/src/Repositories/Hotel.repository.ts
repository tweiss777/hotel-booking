import Hotel from "../Models/Hotel.Model";

export default class HotelRepository {
  private readonly hotel: typeof Hotel;
  constructor(hotel: typeof Hotel) {
    this.hotel = hotel;
  }

  public async GetHotels(): Promise<Hotel[]> {
    try {
      return await this.hotel.findAll();
    } catch (error) {
      throw error;
    }
  }

  public async CreateHotel({ id, name, address, rating }) {
    try {
      const newHotel = await this.hotel.create({ id, name, address, rating });
      return newHotel;
    } catch (error) {
      throw error;
    }
  }

  public async GetHotel(id: string): Promise<Hotel | null> {
    try {
      return await this.hotel.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
