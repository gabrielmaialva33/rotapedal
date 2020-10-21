import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserController from '../controllers/UserController';
import RoleController from '../controllers/RoleController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

usersRouter.post('/', UserController.create);

usersRouter.use(ensureAuthenticated);
usersRouter.put('/', UserController.update);
usersRouter.delete('/', UserController.delete);
usersRouter.put('/role', RoleController.update);

const upload = multer(uploadConfig.multer);
usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  UserAvatarController.update,
);

export default usersRouter;
