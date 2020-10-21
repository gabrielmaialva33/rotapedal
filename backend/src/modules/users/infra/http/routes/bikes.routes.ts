import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BikeController from '@modules/users/infra/http/controllers/BikeController';

const bikesRoutes = Router();

bikesRoutes.use(ensureAuthenticated);

bikesRoutes.get('/bikes', BikeController.show);
bikesRoutes.post('/bikes', BikeController.create);
bikesRoutes.put('/bikes/:bike_id', BikeController.update);
bikesRoutes.delete('/bikes/:bike_id', BikeController.delete);

export default bikesRoutes;
