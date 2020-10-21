import Route from '../infra/typeorm/entities/Route';
import ICreateRouteDTO from '../dtos/ICreateRouteDTO';

export default interface IRoutesRepository {
  create(data: ICreateRouteDTO): Promise<Route>;
  save(route: Route): Promise<Route>;
  destroy(route: Route): Promise<Route>;
  findRouteById(route_id: string): Promise<Route | undefined>;
  findRouteByName(name: string): Promise<Route | undefined>;
  listAllRoute(): Promise<Route[]>;
}
