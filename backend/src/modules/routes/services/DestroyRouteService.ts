import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRoutesRepository from '../repositories/IRoutesRepository';
import Route from '../infra/typeorm/entities/Route';

@injectable()
class DestroyRouteService {
  constructor(
    @inject('RoutesRepository')
    private routeRepository: IRoutesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(route_id: string, user_id: string): Promise<Route> {
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

    return this.routeRepository.destroy(route);
  }
}

export default DestroyRouteService;
