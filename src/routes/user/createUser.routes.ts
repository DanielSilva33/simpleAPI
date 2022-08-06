import { Router } from "express";
import { CreateUserController } from "../../useCase/user/createUser/CreateUserController";

const createUserRoute = Router();

const createUserController = new CreateUserController();

createUserRoute.post("/user/create", createUserController.handle);

export { createUserRoute };
