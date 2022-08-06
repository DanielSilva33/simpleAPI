import { compare } from "bcryptjs";
import { Admin } from "../../../model/Admin";
import jwt from "jsonwebtoken";
import { logger } from "../../../errors/Winston";
import { AppError } from "../../../errors/AppError";
import { validate } from "email-validator";

interface IAuthAdminUserUseCase {
    email: string;
    password: string;
}

export class AuthAdminUserUseCase {
    async execute({ email, password }: IAuthAdminUserUseCase) {
        const checkEmail = validate(email);
        if (!checkEmail) throw new AppError("Email ou password incorrect", 401);

        const adminUser = await Admin.findOne({ email });
        if (!adminUser) {
            logger.info("User not found");
            throw new AppError("User not found", 404);
        }
        if (adminUser.isAdmin === false)
            throw new AppError("Unauthorized", 401);

        const checkPassword = await compare(password, adminUser.password);

        if (!checkPassword) {
            logger.info("Email ou password incorrect");
            throw new AppError("Email ou password incorrect", 401);
        }

        const secret = process.env.SECRET_KEY_ADMIN_USER;

        const token = jwt.sign(
            {
                id: adminUser._id,
            },
            secret,
            {
                expiresIn: "1h",
            }
        );
        logger.info({
            AuthUserUseCase: {
                user: email,
                token: token,
                status: "User authenticated",
            },
        });
        return { User: adminUser.email, token };
    }
}
