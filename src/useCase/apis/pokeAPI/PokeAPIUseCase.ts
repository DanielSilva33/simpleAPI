import { AppError } from "../../../errors/AppError";
import { logger } from "../../../errors/Winston";
import { FormatResultPokeapi } from "../../../utils/FormatResultPokeapi";
import { PokeAPIService } from "./PokeAPIService";

export class PokeAPIUseCase {
    async execute(pokemon: string) {
        const pokeAPIService = new PokeAPIService();

        if (!pokemon) {
            logger.info("pokemon required");
            throw new AppError("pokemon required", 406);
        }
        const response = await pokeAPIService.execute(pokemon);
        const formatResult = new FormatResultPokeapi();
        const result = await formatResult.execute(response);
        return result;
    }
}
