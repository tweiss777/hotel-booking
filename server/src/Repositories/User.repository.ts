import User from "../Models/User.model";
import Guest from "../Models/Guest.model";
export default class UserRepository {
    private readonly user: typeof User;
    private readonly guest: typeof Guest;
    constructor(user: typeof User, guest: typeof Guest) {
        this.user = user;
        this.guest = guest;
    }

    public async GetUsers(): Promise<User[]> {
        try {
            return await this.user.findAll({
                include: [
                    {
                        model: this.guest,
                        as: "guest",
                        attributes: ["firstName", "lastName", "address"],
                    },
                ],
            });
        } catch (error) {
            throw error;
        }
    }

    public async CreateUser({ id, email, password, role }) {
        try {
            const newUser = await this.user.create({ id, email, password, role });
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    public async GetUser({ email, password }): Promise<User | null> {
        try {
            return await this.user.findOne({ where: { email, password } });
        } catch (error) {
            throw error;
        }
    }

    public async GetUserById(id: string): Promise<User | null> {
        try {
            return await this.user.findOne({
                where: { id },
                include: [
                    {
                        model: this.guest,
                        as: "guest",
                        attributes: ["firstName", "lastName", "address"],
                    },
                ],
            });
        } catch (error) {
            throw error;
        }
    }
}
