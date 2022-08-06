import { AppError } from "../../../errors/AppError";
import { logger } from "../../../errors/Winston";
import { PasswordHash } from "../../../utils/PasswordHash";
import { validate } from "email-validator";
import { Admin } from "../../../model/Admin";

interface ICreateAdminUseCase {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export class CreateAdminUseCase {
    async execute({ name, email, password, isAdmin }: ICreateAdminUseCase) {
        const checkEmail = validate(email);
        if (!checkEmail)
            throw new AppError("Email or password incorrect!", 406);

        const passwordHash = new PasswordHash();
        const userAlreadyExists = await Admin.findOne({ email });

        if (userAlreadyExists) {
            logger.info("User already exists");
            throw new AppError("User already exists", 403);
        }
        const finalPassword = await passwordHash.hash(password);
        await Admin.create({
            name,
            email,
            password: finalPassword,
            isAdmin,
        });
        logger.info({
            CreateUserUseCase: { user: "created", name: name, email: email },
        });

        return { name, email };
    }
}
