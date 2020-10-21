import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRoutesRepository from '@modules/routes/repositories/IRoutesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Route, { IPoint } from '../infra/typeorm/entities/Route';

interface IRequest {
  user_id: string;
  name: string;
  extension: number;
  elevation: number;
  difficult: string;
  stop_points: number;
  point_A: IPoint;
  point_B: IPoint;
}

@injectable()
class CreateRouteService {
  constructor(
    @inject('RoutesRepository')
    private routesRepository: IRoutesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    extension,
    elevation,
    difficult,
    stop_points,
    point_A,
    point_B,
  }: IRequest): Promise<Route> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (!(user.role === 'admin' || user.role === 'moderator')) {
      throw new AppError('User not permitted', 401);
    }

    const checkRouteNameExists = await this.routesRepository.findRouteByName(
      name,
    );
    if (checkRouteNameExists) {
      throw new AppError('Route name already exists', 409);
    }

    const route = await this.routesRepository.create({
      name,
      extension,
      elevation,
      difficult,
      stop_points,
      point_A,
      point_B,
    });

    return route;
  }
}

export default CreateRouteService;
