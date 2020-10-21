import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RouteController from '@modules/routes/infra/http/controllers/RouteController';

const routesRoutes = Router();

routesRoutes.get('/', RouteController.show);

routesRoutes.use(ensureAuthenticated);
routesRoutes.post('/', RouteController.create);
routesRoutes.put('/:route_id', RouteController.update);
routesRoutes.delete('/:route_id', RouteController.delete);

export default routesRoutes;
