import express, {Router }from "express"
import UserRepository from "../Repositories/User.repository"
import Guest from "../Models/Guest.model"
import AuthController from "../Controllers/auth.controller"
import User from "../Models/User.model"
import { v4 } from "uuid"

const ac: AuthController = new AuthController(new UserRepository(User, Guest),v4)


const router: Router = express.Router()



router.route("/login").post(ac.Login)
router.route("/register").post(ac.Register)


export default router;
