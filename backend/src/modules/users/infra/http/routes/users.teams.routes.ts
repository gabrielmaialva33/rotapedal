import { Router } from 'express';

import UserTeamController from '@modules/users/infra/http/controllers/UserTeamController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersTeamsRoutes = Router();

usersTeamsRoutes.use(ensureAuthenticated);
usersTeamsRoutes.get('/', UserTeamController.show);
usersTeamsRoutes.post('/:team_id', UserTeamController.create);
usersTeamsRoutes.delete('/:team_id', UserTeamController.delete);

export default usersTeamsRoutes;
