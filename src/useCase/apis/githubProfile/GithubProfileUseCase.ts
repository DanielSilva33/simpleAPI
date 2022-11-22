import { AppError } from "../../../errors/AppError";
import { logger } from "../../../errors/Winston";
import { getFromCache, setToCache } from "../../../database/redis/redisConfig";
import { GithubProfileService } from "./GithubProfileService";

export class GithubProfileUseCase {
    async execute(username: string) {
        const githubProfileService = new GithubProfileService();
        const dayInMillisecond = 86400;
        if (!username) {
            logger.info("Username required");
            throw new AppError("Username required", 406);
        }
        const profileCache = await getFromCache(`github-profile-${username}`);
        if (profileCache) {
            const result = JSON.parse(profileCache);
            return result;
        }
        const result = await githubProfileService.execute(username);

        await setToCache(
            `github-profile-${username}`,
            `${JSON.stringify(result)}`,
            dayInMillisecond
        );
        return result;
    }
}
