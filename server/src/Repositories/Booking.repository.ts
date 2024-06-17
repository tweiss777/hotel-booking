import Hotel from "../Models/Hotel.Model";
import Guest from "../Models/Guest.model";
import HotelGuest from "../Models/HotelGuest.model";

export default class BookingRepository {
  private hotelGuest: typeof HotelGuest;
  private hotel: typeof Hotel;
  private guest: typeof Guest;
  constructor(
    hotelGuest: typeof HotelGuest,
    hotel: typeof Hotel,
    guest: typeof Guest,
  ) {
    this.hotelGuest = hotelGuest;
    this.hotel = hotel;
    this.guest = guest;
  }
  public async CreateBooking(newBooking): Promise<HotelGuest> {
    try {
      const booking = await this.hotelGuest.create(newBooking);
      return booking;
    } catch (error) {
      throw error;
    }
  }

  public async GetBookingsByUser(guestId: string): Promise<HotelGuest[]> {
    try {
      return await this.hotelGuest.findAll({
        attributes: [
          "id",
          "reserveDate",
          "checkoutDate",
          "lastUpdated",
          "guestId",
          "hotelId",
        ],
        where: { guestId },
        include: [
          {
            model: this.hotel,
            as: "hotel",
            attributes: ["name"],
          },
          {
            model: this.guest,
            as: "guest",
            attributes: ["firstName", "lastName"],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }
  public async GetBooking(bookingId: string): Promise<HotelGuest | null> {
    try {
      return await this.hotelGuest.findOne({
        attributes: [
          "id",
          "reserveDate",
          "checkoutDate",
          "lastUpdated",
          "guestId",
          "hotelId",
        ],
        where: { id: bookingId },
        include: [
          {
            model: this.hotel,
            as: "hotel",
            attributes: ["name"],
          },
          {
            model: this.guest,
            as: "guest",
            attributes: ["firstName", "lastName"],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }
  public async GetBookings(): Promise<HotelGuest[]> {
    try {
      return await this.hotelGuest.findAll({
        attributes: [
          "id",
          "reserveDate",
          "checkoutDate",
          "lastUpdated",
          "guestId",
          "hotelId",
        ],
        include: [
          {
            model: this.hotel,
            as: "hotel",
            attributes: ["name"],
          },
          {
            model: this.guest,
            as: "guest",
            attributes: ["firstName", "lastName"],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }
}
