import axios from "axios";
import { AppError } from "../../../errors/AppError";
import { logger } from "../../../errors/Winston";

export class PokeAPIService {
    async execute(pokemon: string) {
        try {
            const baseURL = process.env.BASE_URL_POKEMON;
            const url = `${baseURL}/${pokemon}`;
            const response = await axios.get(url);
            logger.info({
                PokeAPIUseCase: {
                    pokemon,
                    url: url,
                    method: response.config.method,
                },
            });

            return response.data;
        } catch (error) {
            logger.error("invalid parameters");
            throw new AppError("invalid parameters", 400);
        }
    }
}
