import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AddUserTeamService from '@modules/users/services/team/AddUserTeamService';
import RemoveUserTeamService from '@modules/users/services/team/RemoveUserTeamService';
import ShowUserTeamService from '@modules/users/services/team/ShowUserTeamService';
import AppError from '@shared/errors/AppError';
import { SchemaAdd } from '@modules/users/infra/http/controllers/validations/TeamSchema';

class UserTeamController {
  public async create(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaAdd.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { team_id } = request.params;
    const { email } = request.body;

    const addUserTeam = container.resolve(AddUserTeamService);

    const team = await addUserTeam.execute({ email, team_id, user_id });

    return response.json(classToClass(team));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { team_id } = request.params;
    const { email } = request.body;

    const removeUserTeam = container.resolve(RemoveUserTeamService);

    await removeUserTeam.execute({ email, team_id, user_id });

    return response.json({ message: 'User removed from team' });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showTeams = container.resolve(ShowUserTeamService);

    const userTeams = await showTeams.execute(user_id);

    return response.json(classToClass(userTeams));
  }
}

export default new UserTeamController();
