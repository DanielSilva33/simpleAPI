import { Router } from "express";
import { PokeAPIController } from "../../useCase/apis/pokeAPI/PokeAPIController";

const pokeAPIRoute = Router();

const pokeAPI = new PokeAPIController();

pokeAPIRoute.get("/api/pokeapi/pokemon/:pokemon", pokeAPI.handle);

export { pokeAPIRoute };
