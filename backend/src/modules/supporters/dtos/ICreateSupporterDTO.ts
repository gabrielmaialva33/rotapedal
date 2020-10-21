import { IPoint } from '@modules/routes/infra/typeorm/entities/Route';

export default interface ICreateSupporterDTO {
  user_id: string;
  route_id: string;
  name: string;
  phone: string;
  services: string;
  link: string;
  point: IPoint;
}
