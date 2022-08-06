import { AppError } from "../../errors/AppError";
import { logger } from "../../errors/Winston";
import { User } from "../../model/User";
import { PasswordHash } from "../../utils/PasswordHash";
import { validate } from "email-validator";

interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    async execute({ name, email, password }: ICreateUser) {
        const passwordHash = new PasswordHash();
        const userAlreadyExists = await User.findOne({ email });
        const checkEmail = await validate(email);
        if (!checkEmail)
            throw new AppError("Email or password incorrect!", 406);
        if (userAlreadyExists) {
            logger.info("User already exists");
            throw new AppError("User already exists", 403);
        }
        const finalPassword = await passwordHash.hash(password);
        const createUser = await User.create({
            name,
            email,
            password: finalPassword,
        });
        logger.info({
            CreateUserUseCase: { user: "created", name: name, email: email },
        });

        return createUser;
    }
}
