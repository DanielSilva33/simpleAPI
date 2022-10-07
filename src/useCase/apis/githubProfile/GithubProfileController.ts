import { Request, Response } from "express";
import { GithubProfileUseCase } from "./GithubProfileUseCase";

export class GithubProfileController {
    async handle(request: Request, response: Response) {
        const { username } = request.params;
        const githubProfile = new GithubProfileUseCase();

        const result = await githubProfile.execute(username);

        return response.json(result);
    }
}
