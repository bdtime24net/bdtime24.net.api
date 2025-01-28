import { Router } from "express";
import { createArticleController, getArticlesController, updateArticleController, deleteArticleController, getArticleBySlugController, getLatestArticlesController } from "./article.controller";
// import veryfyToken from '../../middlewares/auth.middleware'



const articleRoutes: Router = Router();

articleRoutes.post("/article/create", createArticleController);

articleRoutes.get("/article", getArticlesController);

articleRoutes.get("/article/:slug", getArticleBySlugController);

articleRoutes.get('/article/latest', getLatestArticlesController)

// articleRoutes.get("/article/:id", getArticleByIdController);

articleRoutes.put("/article/:id", updateArticleController);

articleRoutes.delete("/article/:id", deleteArticleController);



export default articleRoutes;
