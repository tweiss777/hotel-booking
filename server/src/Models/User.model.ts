import Guest from "./Guest.model";
import { Model, PrimaryKey, Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Role } from "../utils/role.enum";
@Table
export default class User extends Model {
    @PrimaryKey
    @Column
    id: string;
    @Column
    email: string;
    @Column
    password: string;
    @Column
    role: Role;
    @Column
    @ForeignKey(() => Guest)
    guestId: string;
    @BelongsTo(() => Guest)
    guest: Guest;
}
