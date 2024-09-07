import { Router } from "express";

const tagsRoutes: Router = Router();
import {createTageController} from './tag.controller'


tagsRoutes.post("/tag/create", createTageController);
export default tagsRoutes