import { injectable, inject } from 'tsyringe';

import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import Supporter from '@modules/supporters/infra/typeorm/entities/Supporter';
import IRoutesRepository from '@modules/routes/repositories/IRoutesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ListRouteSupporterService {
  constructor(
    @inject('RoutesRepository')
    private routeRepository: IRoutesRepository,

    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository,
  ) {}

  public async execute(route_id: string): Promise<Supporter[] | undefined> {
    const checkRouteExist = await this.routeRepository.findRouteById(route_id);
    if (!checkRouteExist) {
      throw new AppError('Route not found', 404);
    }

    const supporters = await this.supportersRepository.listAllSupporterByRoute(
      route_id,
    );

    return supporters;
  }
}

export default ListRouteSupporterService;
