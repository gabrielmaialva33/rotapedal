import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/user/CreateUserService';
import UpdateUserService from '@modules/users/services/user/UpdateUserService';
import DestroyUserService from '@modules/users/services/user/DestroyUserService';
import {
  SchemaCreate,
  SchemaUpdate,
} from '@modules/users/infra/http/controllers/validations/UserSchema';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaCreate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    if (!(await SchemaUpdate.isValid(request.body))) {
      throw new AppError('Validation fails', 400);
    }

    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;
    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const deleteUser = container.resolve(DestroyUserService);

    await deleteUser.execute(user_id);

    return response.json({ message: 'User has be deleted' });
  }
}

export default new UsersController();
