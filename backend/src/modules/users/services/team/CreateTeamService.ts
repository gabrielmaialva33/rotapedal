import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Team from '@modules/users/infra/typeorm/entities/Team';
import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  owner: string;
  name: string;
  description: string;
}

@injectable()
class CreateTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ owner, name, description }: IRequest): Promise<Team> {
    const checkUserIdExists = await this.usersRepository.findById(owner);
    if (!checkUserIdExists) {
      throw new AppError('User not found', 404);
    }

    const checkNameExists = await this.teamsRepository.findTeamByName(name);

    if (checkNameExists) {
      throw new AppError('Team name already exists', 409);
    }

    const team = this.teamsRepository.create({ owner, name, description });

    return team;
  }
}

export default CreateTeamService;
