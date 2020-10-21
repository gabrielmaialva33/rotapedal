import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateRoleService from '@modules/users/services/user/UpdateRoleService';
import AppError from '@shared/errors/AppError';
import { SchemaAddRole } from '@modules/users/infra/http/controllers/validations/UserSchema';

class UpdateRoleController {
  public async update(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaAddRole.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { email, role } = request.body;

    const updateRole = container.resolve(UpdateRoleService);

    const user = await updateRole.execute({ user_id, email, role });

    return response.json(classToClass(user));
  }
}

export default new UpdateRoleController();
