import Guest from "./Guest.model";
import Hotel from "./Hotel.Model";
import HotelGuest from "./HotelGuest.model";
import SequelizeSingleTon from "./Sequelize.singleton";
import { Sequelize, DataTypes } from "sequelize";

export function initHotelGuestModel() {
    const sequelize = SequelizeSingleTon.SequelizeInstance.instance as Sequelize;
    HotelGuest.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            hotelId: {
                type: DataTypes.STRING,
                references: {
                    model: "Hotels",
                    key: "id",
                },
            },
            guestId: {
                type: DataTypes.STRING,
                references: {
                    model: "Guests",
                    key: "id",
                },
            },
            reserveDate: {
                type: DataTypes.DATE,
            },

            lastUpdated: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            tableName: "HotelGuests",
        },
    );
    HotelGuest.belongsTo(Hotel, {
        foreignKey: "hotelId",
        as: "hotel",
    });

    HotelGuest.belongsTo(Guest, {
        foreignKey: "guestId",
        as: "guest",
    });
}
