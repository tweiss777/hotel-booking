import express from "express";
import { GuestController } from "../Controllers/guests.controller";
import Guest from "../Models/Guest.model";
import { v4 } from "uuid";
import GuestRepository from "../Repositories/Guest.repository";

const router = express.Router();
const gc = new GuestController(new GuestRepository(Guest), v4)

router.route("/").get(gc.getGuests);
router.route("/").post(gc.createGuest);
router.route('/:id').get(gc.getGuest);

export default router;
