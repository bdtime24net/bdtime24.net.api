import { Router } from "express";
import { createArticleController, getArticlesController, getArticleByIdController, updateArticleController, deleteArticleController } from "./article.controller";
// import veryfyToken from '../../middlewares/auth.middleware'



const articleRoutes: Router = Router();

articleRoutes.post("/article/create", createArticleController);

articleRoutes.get("/article", getArticlesController);


articleRoutes.get("/article/:id", getArticleByIdController);

articleRoutes.put("/article/:id", updateArticleController);

articleRoutes.delete("/article/:id", deleteArticleController);



export default articleRoutes;
