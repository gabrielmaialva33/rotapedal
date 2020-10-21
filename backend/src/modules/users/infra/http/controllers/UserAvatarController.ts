import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/user/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new UserAvatarController();
