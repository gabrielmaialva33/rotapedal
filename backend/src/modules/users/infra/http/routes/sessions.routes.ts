import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionsController.create);

export default sessionsRouter;
