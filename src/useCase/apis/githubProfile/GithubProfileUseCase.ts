import { AppError } from "../../../errors/AppError";
import { logger } from "../../../errors/Winston";
import { GithubProfileService } from "./GithubProfileService";

export class GithubProfileUseCase {
    async execute(username: string) {
        const githubProfileService = new GithubProfileService();
        if (!username) {
            logger.info("Username required");
            throw new AppError("Username required", 406);
        }
        const result = githubProfileService.execute(username);
        return result;
    }
}
