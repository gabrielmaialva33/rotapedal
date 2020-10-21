import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EventController from '@modules/supporters/infra/http/controllers/EventController';

const eventsRoutes = Router();

eventsRoutes.get('/:event_id', EventController.show);

eventsRoutes.use(ensureAuthenticated);
eventsRoutes.post('/:supporter_id', EventController.create);
eventsRoutes.put('/:supporter_id/:event_id', EventController.update);
eventsRoutes.delete('/:supporter_id/:event_id', EventController.delete);

export default eventsRoutes;
