import { injectable, inject } from 'tsyringe';

import IEventsRepository from '@modules/supporters/repositories/IEventsRepository';
import AppError from '@shared/errors/AppError';
import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import Event from '@modules/supporters/infra/typeorm/entities/Event';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class DestroyEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('SupportersRepository')
    private supportersRepositoery: ISupportersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    user_id: string,
    supporter_id: string,
    event_id: string,
  ): Promise<Event> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (!(user.role === 'admin' || user.role === 'supporter')) {
      throw new AppError('User not permitted', 401);
    }

    //* check event exists
    const event = await this.eventsRepository.findEventById(event_id);
    if (!event) {
      throw new AppError('Event not found', 404);
    }

    //* check supporter exists
    const supporter = this.supportersRepositoery.findSupporterById(
      supporter_id,
    );
    if (!supporter) {
      throw new AppError('Supporter not found', 404);
    }
    if (!(event.supporter_id === supporter_id)) {
      throw new AppError('Supporter not owner event', 401);
    }

    await this.eventsRepository.destroy(event);
    return event;
  }
}

export default DestroyEventService;
