import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SupporterController from '@modules/supporters/infra/http/controllers/SupporterController';
import ListSupporterController from '@modules/supporters/infra/http/controllers/ListSupporterController';
import UpdateLogoController from '@modules/supporters/infra/http/controllers/UpdateLogoController';
import uploadConfig from '@config/upload';

const supportersRoutes = Router();

supportersRoutes.get('/:supporter_id', SupporterController.show);
supportersRoutes.get('/all/list', SupporterController.index)
supportersRoutes.get('/list/:route_id', ListSupporterController.show);

//* protected route
supportersRoutes.use(ensureAuthenticated);
supportersRoutes.post('/:route_id?', SupporterController.create);
supportersRoutes.put('/:supporter_id', SupporterController.update);
supportersRoutes.delete('/:supporter_id', SupporterController.delete);

//* add logo supporter 

//todo create default logo

const upload = multer(uploadConfig.multer);
supportersRoutes.patch(
  '/logo/:supporter_id',
  upload.single('logo'),
  UpdateLogoController.update,
);

export default supportersRoutes;
