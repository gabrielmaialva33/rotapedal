import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowEventService from '@modules/supporters/services/event/ShowEventService';
import CreateEventService from '@modules/supporters/services/event/CreateEventService';
import UpdateEventService from '@modules/supporters/services/event/UpdateEventService';
import DestroyEventService from '@modules/supporters/services/event/DestroyEventService';
import {
  SchemaCreate,
  SchemaUpdate,
} from '@modules/supporters/infra/http/controllers/validations/EventSchema';
import AppError from '@shared/errors/AppError';

class EventController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { event_id } = request.params;

    const showEvent = container.resolve(ShowEventService);

    const event = await showEvent.execute(event_id);

    return response.json(classToClass(event));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaCreate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { supporter_id } = request.params;
    const { name, description, starts_in, ends_in, link, point } = request.body;

    const createEvent = container.resolve(CreateEventService);

    const event = await createEvent.execute({
      user_id,
      supporter_id,
      name,
      description,
      starts_in,
      ends_in,
      link,
      point,
    });

    return response.json(classToClass(event));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaUpdate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { supporter_id, event_id } = request.params;
    const { name, description, starts_in, ends_in, link, point } = request.body;

    const updateEvent = container.resolve(UpdateEventService);

    const event = await updateEvent.execute({
      supporter_id,
      user_id,
      event_id,
      name,
      description,
      starts_in,
      ends_in,
      link,
      point,
    });

    return response.json(classToClass(event));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { supporter_id, event_id } = request.params;

    const eventDelete = container.resolve(DestroyEventService);

    await eventDelete.execute(user_id, supporter_id, event_id);

    return response.json({ message: 'Event has be deleted' });
  }
}

export default new EventController();
