import { IPoint } from '../infra/typeorm/entities/Route';

export default interface ICreateRouteDTO {
  name: string;
  extension: number;
  elevation: number;
  difficult: string;
  stop_points: number;
  point_A: IPoint;
  point_B: IPoint;
}
