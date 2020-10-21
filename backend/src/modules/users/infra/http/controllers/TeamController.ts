import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowTeamService from '@modules/users/services/team/ShowTeamService';
import CreateTeamService from '@modules/users/services/team/CreateTeamService';
import UpdateTeamService from '@modules/users/services/team/UpdateTeamService';
import DestroyTeamService from '@modules/users/services/team/DestroyTeamService';
import AppError from '@shared/errors/AppError';
import {
  SchemaCreate,
  SchemaUpdate,
} from '@modules/users/infra/http/controllers/validations/TeamSchema';

class TeamController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showTeam = container.resolve(ShowTeamService);

    const team = await showTeam.execute(user_id);

    return response.json(classToClass(team));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaCreate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { name, description } = request.body;

    const creataTeam = container.resolve(CreateTeamService);

    const team = await creataTeam.execute({
      owner: user_id,
      name,
      description,
    });

    return response.json(classToClass(team));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaUpdate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { team_id } = request.params;
    const { name, description } = request.body;

    const updateTeam = container.resolve(UpdateTeamService);

    const team = await updateTeam.execute(
      { id: team_id, name, description },
      user_id,
    );

    return response.json(classToClass(team));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { team_id } = request.params;

    const deleteTeam = container.resolve(DestroyTeamService);
    await deleteTeam.execute(team_id, user_id);

    return response.json({ message: 'Team has be deleted' });
  }
}

export default new TeamController();
