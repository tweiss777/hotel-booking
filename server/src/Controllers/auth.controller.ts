import "dotenv/config";
import UserRepository from "../Repositories/User.repository";
import { LoginDto } from "../dtos/auth/Login.dto";
import { Request, Response, NextFunction } from "express";
import NewUserDTO from "../dtos/auth/NewUser.dto";
import { sign } from "jsonwebtoken";
import { Role } from "../utils/role.enum";
import { ValidateSchema } from "../Validations/Validation.decorator";
import User from "../Models/User.model";
export default class AuthController {
    private readonly userRepo: UserRepository;
    private readonly uuid: () => string;

    constructor(userRepo: UserRepository, uuid: () => string) {
        this.userRepo = userRepo;
        this.uuid = uuid;

        this.Login = this.Login.bind(this);
        this.Register = this.Register.bind(this);
    }

    async Login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginDto: LoginDto = {
                email: req.body.email,
                password: req.body.password,
            };
            const user = await this.userRepo.GetUser(loginDto);
            if (!user || user.password !== loginDto.password) {
                res.status(404).send({ error: "invalid username or password" });
                return 
            }
            const token = this.GenerateToken(user);
            res.status(200).send({ token });  
        } catch (error) {
            next(error);
        }
    }

    @ValidateSchema("NewUser")
    async Register(req: Request, res: Response, next: NextFunction) {
        try {
            let newUserDto: NewUserDTO = {
                email: req.body.email,
                password: req.body.password,
            };
            const existingUser = await this.userRepo.GetUser({
                email: newUserDto.email,
            });
            if (existingUser) {
                res.status(409).send({ error: "user already exists" });
            }
            const user = await this.userRepo.CreateUser({
                ...newUserDto,
                id: this.uuid(),
                role: Role.User,
            });
            const token = this.GenerateToken(user);

            res.status(201).send({ token });

            return;
        } catch (error) {
            next(error);
        }
    }

    private GenerateToken(user: User): string {
        let role: string = "";
        switch (user.role) {
            case Role.User:
                role = "User";
                break;
            case Role.Admin:
                role = "Admin";
                break;
            default:
                role = "User";
                break;
        }
        const token = sign(
            { email: user?.email, role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );
        return token;
    }
}
