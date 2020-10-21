import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profilesRouter = Router();

profilesRouter.use(ensureAuthenticated);

profilesRouter.get('/profile', ProfileController.show);
profilesRouter.post('/profile', ProfileController.create);
profilesRouter.put('/profile', ProfileController.update);

export default profilesRouter;
