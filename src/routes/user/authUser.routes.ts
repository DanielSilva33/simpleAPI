import { Router } from "express";
import { AuthUserController } from "../../useCase/user/authUser/AuthUserController";

const authUserRoute = Router();

const authUserController = new AuthUserController();

authUserRoute.post("/user/auth", authUserController.handle);

export { authUserRoute };
