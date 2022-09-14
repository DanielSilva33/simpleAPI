import { getRedis, setRedis } from "../../../database/redis/redisConfig";
import { AppError } from "../../../errors/AppError";
import { logger } from "../../../errors/Winston";
import { FormatResultPokeapi } from "../../../utils/FormatResultPokeapi";
import { PokeAPIService } from "./PokeAPIService";

export class PokeAPIUseCase {
    async execute(pokemon: string) {
        const dayInMillisecond = 86400;
        if (!pokemon) {
            logger.info("pokemon required");
            throw new AppError("pokemon required", 406);
        }
        const pokemonRedis = await getRedis(`pokemon-${pokemon}`);
        if (pokemonRedis) {
            const result = JSON.parse(pokemonRedis);
            return result;
        }
        const pokeAPIService = new PokeAPIService();

        const response = await pokeAPIService.execute(pokemon);
        const formatResult = new FormatResultPokeapi();
        const result = await formatResult.execute(response);
        await setRedis(
            `pokemon-${pokemon}`,
            `${JSON.stringify(result)}`,
            dayInMillisecond
        );
        return result;
    }
}
