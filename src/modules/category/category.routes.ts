import { Router } from "express";
const categoryRoutes: Router = Router();
import veryfyToken from "../../middlewares/auth.middleware";

import {categoryController, getCategoriesController, deleteCategoryController, updateCategoryController} from "./category.controller";


categoryRoutes.post("/category/create", veryfyToken, categoryController);
categoryRoutes.get("/category", getCategoriesController);


categoryRoutes.delete("/category/:id", veryfyToken, deleteCategoryController);
categoryRoutes.put("/category/:id", veryfyToken, updateCategoryController);



export default categoryRoutes;