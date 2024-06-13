import {
  PrimaryKey,
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Guest from "./Guest.model";
import Hotel from "./Hotel.Model";
@Table
class HotelGuest extends Model {
  @PrimaryKey
  @Column
  id: string;
  @Column
  @ForeignKey(() => Hotel)
  hotelId: string;
  @Column
  @ForeignKey(() => Guest)
  guestId: string;
  @Column
  reserveDate: Date;
  @Column
  lastUpdated: Date;
  @BelongsTo(() => Hotel)
  hotel: Hotel;
  @BelongsTo(() => Guest)
  guest: Guest;
}

export default HotelGuest;
