import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/user/AuthenticateUserService';
import SessionCreate from '@modules/users/infra/http/controllers/validations/SessionsSchema';
import AppError from '@shared/errors/AppError';
import { string } from 'yup';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SessionCreate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.cookie('token', token).json({ user: classToClass(user), token });
  }
}
export default new SessionsController();
