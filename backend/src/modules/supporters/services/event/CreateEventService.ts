import { injectable, inject } from 'tsyringe';
import { isPast, parseISO, isBefore } from 'date-fns';

import IEventsRepository from '@modules/supporters/repositories/IEventsRepository';
import Event from '@modules/supporters/infra/typeorm/entities/Event';
import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { IPoint } from '@modules/routes/infra/typeorm/entities/Route';

interface IRequest {
  user_id: string;
  supporter_id: string;
  name: string;
  description: string;
  starts_in: Date;
  ends_in: Date;
  link: string;
  point: IPoint;
}

@injectable()
class CreateEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    supporter_id,
    name,
    description,
    starts_in,
    ends_in,
    link,
    point,
  }: IRequest): Promise<Event> {
    //* checks exists
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (!(user.role === 'admin' || user.role === 'supporter')) {
      throw new AppError('User not permitted', 401);
    }

    const supporter = await this.supportersRepository.findSupporterById(
      supporter_id,
    );
    if (!supporter) {
      throw new AppError('Supporter not found', 404);
    }
    const checkEventExists = await this.eventsRepository.findEventByName(name);
    if (checkEventExists) {
      throw new AppError('Event name already exists', 409);
    }

    const checkEventLinkExists = await this.eventsRepository.findEventByLink(
      link,
    );
    if (checkEventLinkExists) {
      throw new AppError('Event name already exists', 409);
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

    const event = await this.eventsRepository.create({
      supporter_id,
      name,
      description,
      starts_in,
      ends_in,
      link,
      point,
    });

    return event;
  }
}

export default CreateEventService;
