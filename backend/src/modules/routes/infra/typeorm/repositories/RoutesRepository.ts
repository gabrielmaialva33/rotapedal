import { Repository, getRepository, Raw } from 'typeorm';

import IRoutesRepository from '@modules/routes/repositories/IRoutesRepository';
import ICreateRouteDTO from '@modules/routes/dtos/ICreateRouteDTO';
import Route from '../entities/Route';

class RoutesRepository implements IRoutesRepository {
  private ormRepository: Repository<Route>;

  constructor() {
    this.ormRepository = getRepository(Route);
  }

  public async create({
    name,
    extension,
    elevation,
    difficult,
    stop_points,
    point_A,
    point_B,
  }: ICreateRouteDTO): Promise<Route> {
    const route = this.ormRepository.create({
      name,
      extension,
      elevation,
      difficult,
      stop_points,
      point_A,
      point_B,
    });

    await this.ormRepository.save(route);

    return route;
  }

  public async save(route: Route): Promise<Route> {
    return this.ormRepository.save(route);
  }

  public async destroy(route: Route): Promise<Route> {
    return this.ormRepository.remove(route);
  }

  public async findRouteById(route_id: string): Promise<Route | undefined> {
    const route = await this.ormRepository.findOne({ where: { id: route_id } });
    return route;
  }

  // ? Raw create ILIKE query
  public async findRouteByName(name: string): Promise<Route | undefined> {
    const route = await this.ormRepository.findOne({
      name: Raw(alias => `${alias} ILIKE '%${name}%'`),
    });

    return route;
  }

  public async listAllRoute(): Promise<Route[]> {
    const routes = await this.ormRepository.find({
      order: { created_at: 'ASC' },
    });
    return routes;
  }
}

export default RoutesRepository;
