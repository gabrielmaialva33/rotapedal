import { getRepository, Repository } from 'typeorm';

import IEventsRepository from '@modules/supporters/repositories/IEventsRepository';
import ICreateEventDTO from '@modules/supporters/dtos/ICreateEventDTO';
import Event from '../entities/Event';

class EventsRepositorty implements IEventsRepository {
  private ormRepository: Repository<Event>;

  constructor() {
    this.ormRepository = getRepository(Event);
  }

  public async create({
    supporter_id,
    name,
    description,
    starts_in,
    ends_in,
    point,
    link,
  }: ICreateEventDTO): Promise<Event> {
    const event = this.ormRepository.create({
      supporter_id,
      name,
      description,
      starts_in,
      ends_in,
      point,
      link,
    });

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: Event): Promise<Event> {
    return this.ormRepository.save(event);
  }

  public async destroy(event: Event): Promise<Event> {
    return this.ormRepository.remove(event);
  }

  public async findEventById(event_id: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findOne({ where: { id: event_id } });
    return event;
  }

  public async findEventBySupporterId(
    supporter_id: string,
  ): Promise<Event[] | undefined> {
    const event = await this.ormRepository.find({
      where: { supporter_id },
    });
    return event;
  }

  public async findEventByName(name: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findOne({ where: { name } });
    return event;
  }

  public async findEventByLink(link: string): Promise<Event | undefined> {
    const event = await this.ormRepository.findOne({ where: { link } });
    return event;
  }
}

export default EventsRepositorty;
