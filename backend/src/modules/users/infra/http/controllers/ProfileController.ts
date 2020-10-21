import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowProfileService from '@modules/users/services/profile/ShowProfileService';
import CreateProfileService from '@modules/users/services/profile/CreateProfileService';
import UpdateProfileService from '@modules/users/services/profile/UpdateProfileService';
import AppError from '@shared/errors/AppError';
import {
  SchemaCreate,
  SchemaUpdate,
} from '@modules/users/infra/http/controllers/validations/ProfileSchema';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute(user_id);

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaCreate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { nickname, birthdate, phone, bio } = request.body;
    const createProfile = container.resolve(CreateProfileService);

    const profile = await createProfile.execute({
      user_id,
      nickname,
      birthdate,
      phone,
      bio,
    });

    return response.json(classToClass(profile));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaUpdate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { nickname, birthdate, phone, bio } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const profile = await updateProfile.execute({
      user_id,
      nickname,
      birthdate,
      phone,
      bio,
    });

    return response.json(classToClass(profile));
  }
}

export default new ProfileController();
