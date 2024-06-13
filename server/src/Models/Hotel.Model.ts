import { PrimaryKey, Model, Table, Column } from "sequelize-typescript";
@Table
class Hotel extends Model {
  @PrimaryKey
  @Column
  id: string;
  @Column
  name: string;
  @Column
  address: string;
  @Column
  rating: number;
  @Column
  img_url: string;
}

export default Hotel;
