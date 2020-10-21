import { injectable, inject } from 'tsyringe';

import IRoutesRepository from '../repositories/IRoutesRepository';
import Route from '../infra/typeorm/entities/Route';

@injectable()
class ShowRouteService {
  constructor(
    @inject('RoutesRepository')
    private routeRepository: IRoutesRepository,
  ) {}

  public async execute(): Promise<Route[]> {
    const routes = await this.routeRepository.listAllRoute();
    return routes;
  }
}

export default ShowRouteService;
