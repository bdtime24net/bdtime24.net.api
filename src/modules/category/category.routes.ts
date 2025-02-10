import { Router } from "express";
const categoryRoutes: Router = Router();
import verifyToken from "../../middlewares/auth.middleware";

import {categoryController, getCategoriesController, deleteCategoryController, updateCategoryController} from "./category.controller";


categoryRoutes.post("/category/create", verifyToken, categoryController);
categoryRoutes.get("/category", getCategoriesController);


categoryRoutes.delete("/category/:id", verifyToken, deleteCategoryController);
categoryRoutes.put("/category/:id", verifyToken, updateCategoryController);



export default categoryRoutes;