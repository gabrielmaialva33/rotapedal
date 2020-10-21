import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Route, { IPoint } from '../infra/typeorm/entities/Route';
import IRoutesRepository from '../repositories/IRoutesRepository';

interface IRequest {
  user_id: string;
  route_id: string;
  name: string;
  extension: number;
  elevation: number;
  difficult: string;
  stop_points: number;
  point_A: IPoint;
  point_B: IPoint;
}

@injectable()
class UpdateRouteService {
  constructor(
    @inject('RoutesRepository')
    private routeRepository: IRoutesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    route_id,
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

    const route = await this.routeRepository.findRouteById(route_id);
    if (!route) {
      throw new AppError('Route not found', 404);
    }

    route.name = name;
    route.extension = extension;
    route.elevation = elevation;
    route.difficult = difficult;
    route.stop_points = stop_points;
    route.point_A = point_A;
    route.point_B = point_B;

    return this.routeRepository.save(route);
  }
}

export default UpdateRouteService;
