import { Router } from "express";
import { Auth } from "./middleware/Auth";
import { githubProfileRoute } from "./apis/githubProfile.routes";
import { authUserRoute } from "./user/authUser.routes";
import { createUserRoute } from "./user/createUser.routes";

const routes = Router();
const authMiddleware = new Auth();

routes.use(authUserRoute);
routes.use(authMiddleware.execute);
routes.use(createUserRoute);
routes.use(githubProfileRoute);

export { routes };
