import "dotenv/config";
import express from "express";
import cors from "cors";
import guestRouter from "./Routes/guests.routes";
import hotelRouter from "./Routes/hotels.routes";
import bookingRouter from "./Routes/booking.route";
import authRouter from "./Routes/auth.routes";
import SequelizeSingleTon from "./Models/Sequelize.singleton";
import { Sequelize } from "sequelize";
import SchemaMap from "./Validations/SchemaMap";
import { GuestSchema } from "./Validations/Guest/Guest.schema";
import { HotelSchema } from "./Validations/Hotel/Hotel.schema";
import AjvInstance from "./Validations/AjvInstance";
import { UserSchema } from "./Validations/User/User.schema";

AjvInstance.AjvInstance.instance.addKeyword("notEmpty", {
    keyword: "notEmpty",
    validate: (_flag: boolean, data: string) => {
        return typeof data === "string" && data.trim().length > 0;
    },
    errors: true,
})

SequelizeSingleTon.SequelizeInstance.set({
  host: process.env.DB_HOST as string,
  dbName: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
});

SchemaMap.SchemaMapInstance.instance.addSchema("Guest", GuestSchema);
SchemaMap.SchemaMapInstance.instance.addSchema("Hotel", HotelSchema);
SchemaMap.SchemaMapInstance.instance.addSchema("User", UserSchema);
const sequelize = SequelizeSingleTon.SequelizeInstance.instance as Sequelize;
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
const port = process.env.PORT as unknown as number;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/guests", guestRouter);
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/auth", authRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
