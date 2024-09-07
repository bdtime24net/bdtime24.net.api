import { Router } from "express";
const categoryRoutes: Router = Router();

import {categoryController, getCategoriesController} from "./category.controller";


categoryRoutes.post("/category/create", categoryController);
categoryRoutes.get("/category", getCategoriesController);



export default categoryRoutes;