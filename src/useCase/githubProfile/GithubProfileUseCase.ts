import axios from "axios";
import { AppError } from "../../errors/AppError";
import { logger } from "../../errors/Winston";

export class GithubProfileUseCase {
    async execute(username: any) {
        const baseURL = process.env.BASE_URL_GITHUB;
        if (!username) {
            logger.info("Username required");
            throw new AppError("Username required", 406);
        }
        try {
            const url = `${baseURL}/${username}`;
            const response = await axios.get(url);
            logger.info({
                GithubProfileUseCase: {
                    username: username,
                    url: url,
                    method: response.config.method,
                    result: response.data,
                },
            });
            return response.data;
        } catch (error) {
            logger.error("invalid parameters");
            throw new AppError("invalid parameters", 400);
        }
    }
}
