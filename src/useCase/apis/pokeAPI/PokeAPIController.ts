import { Request, Response } from "express";
import { PokeAPIUseCase } from "./PokeAPIUseCase";

export class PokeAPIController {
    async handle(request: Request, response: Response) {
        const { pokemon } = request.params;
        const pokeAPI = new PokeAPIUseCase();

        const result = await pokeAPI.execute(pokemon);

        return response.json(result);
    }
}
