import { Router } from "express";
import { AuthUser } from "./middleware/AuthUser";
import { githubProfileRoute } from "./apis/githubProfile.routes";
import { authUserRoute } from "./user/authUser.routes";
import { createUserRoute } from "./user/createUser.routes";
import { createAdminUserRoute } from "./admin/admin.routes";

const routes = Router();
const authUserMiddleware = new AuthUser();

routes.use(createAdminUserRoute);
routes.use(authUserRoute);
routes.use(authUserMiddleware.execute);
routes.use(createUserRoute);
routes.use(githubProfileRoute);

export { routes };
