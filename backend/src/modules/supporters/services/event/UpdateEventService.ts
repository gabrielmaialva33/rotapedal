import { injectable, inject } from 'tsyringe';
import { isPast, parseISO, isBefore } from 'date-fns';

import IEventsRepository from '@modules/supporters/repositories/IEventsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import AppError from '@shared/errors/AppError';
import { IPoint } from '@modules/routes/infra/typeorm/entities/Route';
import Event from '@modules/supporters/infra/typeorm/entities/Event';

interface IRequest {
  user_id: string;
  supporter_id: string;
  event_id: string;
  name: string;
  description: string;
  starts_in: Date;
  ends_in: Date;
  link: string;
  point: IPoint;
}

@injectable()
class UpdateEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository,
  ) {}

  public async execute({
    supporter_id,
    user_id,
    event_id,
    name,
    description,
    starts_in,
    ends_in,
    link,
    point,
  }: IRequest): Promise<Event> {
    //* check user exists
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    //* check user permition
    if (!(user.role === 'admin' || user.role === 'supporter')) {
      throw new AppError('User not permitted', 401);
    }

    //* check supporter exists
    const supporter = await this.supportersRepository.findSupporterById(
      supporter_id,
    );
    if (!supporter) {
      throw new AppError('Supporter not found', 404);
    }

    //* check event exists
    const event = await this.eventsRepository.findEventById(event_id);
    if (!event) {
      throw new AppError('Event not found', 404);
    }
    //* check start date
    if (isPast(parseISO(starts_in.toString()))) {
      throw new AppError('Date is past');
    }
    //* check ends date
    if (
      isBefore(parseISO(ends_in.toString()), parseISO(starts_in.toString()))
    ) {
      throw new AppError('Date cannot be before the start');
    }

    event.name = name;
    event.description = description;
    event.starts_in = starts_in;
    event.ends_in = ends_in;
    event.link = link;
    event.point = point;

    await this.eventsRepository.save(event);

    return event;
  }
}

export default UpdateEventService;
