import { IPoint } from '@modules/routes/infra/typeorm/entities/Route';

export default interface ICreateEventDTO {
  supporter_id: string;
  name: string;
  description: string;
  starts_in: Date;
  ends_in: Date;
  point: IPoint;
  link: string;
}
