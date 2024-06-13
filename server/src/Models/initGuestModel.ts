import { DataTypes, Sequelize } from "sequelize";
import Guest from "./Guest.model";
import SequelizeSingleTon from "./Sequelize.singleton";

export function initGuestModel() {
    const sqlInstance = SequelizeSingleTon.SequelizeInstance
        .instance as Sequelize;
    Guest.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING,
            },
            lastName: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize: sqlInstance,
            tableName: "Guests",
        },
    );
}
