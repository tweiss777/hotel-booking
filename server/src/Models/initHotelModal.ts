import { DataTypes, Sequelize } from "sequelize";
import Hotel from "./Hotel.Model";
import SequelizeSingleTon from "./Sequelize.singleton";

export function initHotelModel() {
    const sequelize = SequelizeSingleTon.SequelizeInstance.instance as Sequelize;
    Hotel.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            rating: {
                type: DataTypes.INTEGER,
            },
            img_url: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            tableName: "Hotels",
        },
    );
}
