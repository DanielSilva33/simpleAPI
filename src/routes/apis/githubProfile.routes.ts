import { Router } from "express";
import { GithubProfileController } from "../../useCase/apis/githubProfile/GithubProfileController";

const githubProfileRoute = Router();

const githubProfile = new GithubProfileController();

githubProfileRoute.get("/api/github/profile/:username", githubProfile.handle);

export { githubProfileRoute };
