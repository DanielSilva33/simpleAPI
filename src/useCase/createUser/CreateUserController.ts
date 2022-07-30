import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body;
        const createUserUseCase = new CreateUserUseCase();
        try {
            const createPerson = await createUserUseCase.execute({
                name,
                email,
                password,
            });
            const result = {
                name: createPerson.name,
                email: createPerson.email,
            };
            return response.status(201).json(result);
        } catch (Error) {
            return response.status(400).json(Error.message);
        }
    }
}
