import express from "express";
import { GuestController } from "../Controllers/guests.controller";
import Guest from "../Models/Guest.model";
import { v4 } from "uuid";

const router = express.Router();
const guestModel = Guest
const gc = new GuestController(guestModel, v4)

router.route("/").get(gc.getGuests);
router.route("/").post(gc.createGuest);
router.route('/:id').get(gc.getGuest);

export default router;
