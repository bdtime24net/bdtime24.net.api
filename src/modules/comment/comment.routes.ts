import { Router } from "express";
const commenRoutes  : Router = Router();
import {createCommentController} from './comment.controller'

commenRoutes.post("/comment/create", createCommentController)


export default commenRoutes;