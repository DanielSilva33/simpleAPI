import { compare } from "bcryptjs";
import { User } from "../../model/User";
import jwt from "jsonwebtoken";
import { logger } from "../../errors/Winston";
import { AppError } from "../../errors/AppError";

interface IAuthUser {
    email: string;
    password: string;
}

export class AuthUserUseCase {
    async execute({ email, password }: IAuthUser) {
        const user = await User.findOne({ email });

        if (!user) {
            logger.info("User not found");
            throw new AppError("User not found", 404);
        }

        const checkPassword = await compare(password, user.password);

        if (!checkPassword) {
            logger.info("Email ou password incorrect");
            throw new AppError("Email ou password incorrect", 401);
        }

        const secret = process.env.SECRET_KEY;

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            {
                expiresIn: "1d",
            }
        );
        logger.info({
            AuthUserUseCase: {
                user: email,
                token: token,
                status: "User authenticated",
            },
        });
        return { User: user.email, token };
    }
}
