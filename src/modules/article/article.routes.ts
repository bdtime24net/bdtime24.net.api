import { Router } from "express";
import { createArticleController, getArticlesController } from "./article.controller";

const articleRoutes: Router = Router();

articleRoutes.post("/article/create", createArticleController);

articleRoutes.get("/article", getArticlesController);

export default articleRoutes;
