import Event from '../infra/typeorm/entities/Event';
import ICreateEventDTO from '../dtos/ICreateEventDTO';

export default interface IEventsRepository {
  create(data: ICreateEventDTO): Promise<Event>;
  save(event: Event): Promise<Event>;
  destroy(event: Event): Promise<Event>;
  findEventById(event_id: string): Promise<Event | undefined>;
  findEventBySupporterId(supporter_id: string): Promise<Event[] | undefined>;
  findEventByName(name: string): Promise<Event | undefined>;
  findEventByLink(link: string): Promise<Event | undefined>;
}
