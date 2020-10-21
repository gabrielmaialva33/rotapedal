import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserController from '../controllers/UserController';
import UpdateRoleController from '../controllers/UpdateRoleController';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();

usersRouter.post('/', UserController.create);

usersRouter.use(ensureAuthenticated);
usersRouter.put('/', UserController.update);
usersRouter.delete('/', UserController.delete);
usersRouter.put('/role', UpdateRoleController.update);

const upload = multer(uploadConfig.multer);
usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  UsersAvatarController.update,
);

export default usersRouter;
