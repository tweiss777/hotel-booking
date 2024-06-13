import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";
@Table
class Guest extends Model {
    @PrimaryKey
    @Column
    id: string;

    @Column
    firstName: string;
    @Column
    lastName: string;
    @Column
    address: string;
}

export default Guest;
