import { Router } from 'express';
import { modulerRoutes } from '../routes';
const routes = Router();



// all Routes
modulerRoutes.forEach(({ path, route }) => routes.use(path, route));

export default routes;
