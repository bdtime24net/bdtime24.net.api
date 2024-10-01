import { Router } from "express";

const tagsRoutes: Router = Router();
import {createTageController, getTagsController, deleteTagController, updateTagController, searchTagsController} from './tag.controller'
import veryfyToken from "../../middlewares/auth.middleware";


tagsRoutes.post("/tag/create", veryfyToken, createTageController);
tagsRoutes.get("/tag", getTagsController);
tagsRoutes.delete("/tag/:id", veryfyToken, deleteTagController);
tagsRoutes.put("/tag/:id", veryfyToken, updateTagController);


tagsRoutes.get("/tag/search", veryfyToken, searchTagsController);


export default tagsRoutes