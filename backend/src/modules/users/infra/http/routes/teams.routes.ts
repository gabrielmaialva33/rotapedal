import { Router } from 'express';

import TeamController from '@modules/users/infra/http/controllers/TeamController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const teamsRoutes = Router();

teamsRoutes.use(ensureAuthenticated);

//* Teams Routes
teamsRoutes.get('/', TeamController.show);
teamsRoutes.post('/', TeamController.create);
teamsRoutes.put('/:team_id', TeamController.update);
teamsRoutes.delete('/:team_id', TeamController.delete);

export default teamsRoutes;
