import { Router } from "express";
import { CreateAdminController } from "../../useCase/admin/createUserAdmin/CreateAdminController";
import { AuthAdminUserController } from "../../useCase/admin/authAdminUser/AuthAdminUserController";
import { AuthAdminUser } from "../middleware/AuthAdminUser";

const createAdminUserRoute = Router();

const authAdminUser = new AuthAdminUser();
const createAdminController = new CreateAdminController();
const authAdminUserController = new AuthAdminUserController();

createAdminUserRoute.post("/admin/auth", authAdminUserController.handle);
createAdminUserRoute.post(
    "/admin/create",
    authAdminUser.execute,
    createAdminController.handle
);

export { createAdminUserRoute };
