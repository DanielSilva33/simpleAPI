import { Router } from "express";
import { AuthUser } from "./middleware/AuthUser";
import { githubProfileRoute } from "./apis/githubProfile.routes";
import { authUserRoute } from "./user/authUser.routes";
import { createUserRoute } from "./user/createUser.routes";
import { pokeAPIRoute } from "./apis/pokeAPI.routes";

const routes = Router();
const authUserMiddleware = new AuthUser();

routes.use(authUserRoute);
routes.use(authUserMiddleware.execute);
routes.use(createUserRoute);
routes.use(githubProfileRoute);
routes.use(pokeAPIRoute);

export { routes };
