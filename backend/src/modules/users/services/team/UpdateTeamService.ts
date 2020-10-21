import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Team from '@modules/users/infra/typeorm/entities/Team';
import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    { id, name, description }: IRequest,
    user_id: string,
  ): Promise<Team> {
    const checkUserIdExists = await this.usersRepository.findById(user_id);
    if (!checkUserIdExists) {
      throw new AppError('User not found', 404);
    }

    const checkNameExists = await this.teamsRepository.findTeamByName(name);

    if (checkNameExists) {
      throw new AppError('Team name already exists', 409);
    }

    const team = await this.teamsRepository.findTeamById(id);

    if (!team) {
      throw new AppError('Team not found', 404);
    }

    if (team.owner !== user_id) {
      throw new AppError('User does not own the team', 401);
    }

    team.name = name;
    team.description = description;

    await this.teamsRepository.save(team);

    return team;
  }
}

export default UpdateTeamService;
