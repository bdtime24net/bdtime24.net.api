import { Router } from "express";
import { createArticleController, getArticlesController, getArticleByIdController, updateArticleController, deleteArticleController } from "./article.controller";
import veryfyToken from '../../middlewares/auth.middleware'



const articleRoutes: Router = Router();

articleRoutes.post("/article/create", veryfyToken, createArticleController);

articleRoutes.get("/article", getArticlesController);


articleRoutes.get("/article/:id", getArticleByIdController);

articleRoutes.put("/article/:id", veryfyToken, updateArticleController);

articleRoutes.delete("/article/:id", veryfyToken, deleteArticleController);



export default articleRoutes;
