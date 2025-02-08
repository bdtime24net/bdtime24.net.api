import { Router } from "express";
import { createArticleController, getArticlesController, updateArticleController, deleteArticleController, getArticleByIdController } from "./article.controller";
import verifyToken from '../../middlewares/auth.middleware'



const articleRoutes: Router = Router();

articleRoutes.post("/article/create", verifyToken, createArticleController);

articleRoutes.get("/article",  getArticlesController);

articleRoutes.get("/article/:id", getArticleByIdController);


articleRoutes.put("/article/:id", verifyToken, updateArticleController);

articleRoutes.delete("/article/:id", verifyToken,  deleteArticleController);



export default articleRoutes;
