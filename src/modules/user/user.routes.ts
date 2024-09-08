import  veryfyToken  from '../../middlewares/auth.middleware';
import { Router } from "express";

const userRoutes: Router = Router();
import { getUsersController, getUserDashboardController, getUserProfileController} from './user.controller'

userRoutes.get('/user/dashboard', veryfyToken, getUserDashboardController);
userRoutes.get('/user/profile', veryfyToken, getUserProfileController );
userRoutes.get('/user', veryfyToken, getUsersController);


export default userRoutes