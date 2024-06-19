import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import Hotel from "./Hotel.Model";
import Guest from "./Guest.model";
import HotelGuest from "./HotelGuest.model";
import User from "./User.model";

class InstanceCreatedError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "InstanceCreatedError";
    }
}

class DBConfig {
    host: string;
    username: string;
    dbName: string;
}

export default class SequelizeSingleTon {
    private static instance: Sequelize | null = null;

    public static SequelizeInstance = {
        get instance(): Sequelize | null {
            return SequelizeSingleTon.instance;
        },
        set(config: DBConfig) {
            if (!SequelizeSingleTon.instance) {
                SequelizeSingleTon.instance = new Sequelize({
                    username: config.username,
                    host: config.host,
                    database: config.dbName,
                    dialect: "mysql",
                    models: [Hotel, Guest, HotelGuest, User],
                });
            } else {
                throw new InstanceCreatedError("Instance already created.");
            }
        },
    };

    private constructor(config: DBConfig) { }
}
