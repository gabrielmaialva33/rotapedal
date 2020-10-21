import { injectable, inject } from 'tsyringe';

import IEventsRepository from '@modules/supporters/repositories/IEventsRepository';
import AppError from '@shared/errors/AppError';
import Event from '@modules/supporters/infra/typeorm/entities/Event';

@injectable()
class ShowEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(event_id: string): Promise<Event> {
    const event = await this.eventsRepository.findEventById(event_id);
    if (!event) {
      throw new AppError('Event not found', 404);
    }

    return event;
  }
}

export default ShowEventService;
