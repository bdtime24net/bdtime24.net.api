import { Router } from "express";
import { createArticleController } from "./article.controller";

const articleRoutes: Router = Router();

articleRoutes.post("/article/create", createArticleController);

export default articleRoutes;
