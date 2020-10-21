import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BikeController from '@modules/users/infra/http/controllers/BikeController';

const bikesRoutes = Router();

bikesRoutes.use(ensureAuthenticated);

bikesRoutes.get('/bike', BikeController.show);
bikesRoutes.post('/bike', BikeController.create);
bikesRoutes.put('/bike/:bike_id', BikeController.update);
bikesRoutes.delete('/bike/:bike_id', BikeController.delete);

export default bikesRoutes;
