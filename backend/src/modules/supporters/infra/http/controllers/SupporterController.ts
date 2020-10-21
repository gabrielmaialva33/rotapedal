import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowSupporterService from '@modules/supporters/services/supporter/ShowSupporterService';
import { classToClass } from 'class-transformer';
import CreateSupporterService from '@modules/supporters/services/supporter/CreateSupporterService';
import UpdateSupporterService from '@modules/supporters/services/supporter/UpdateSupporterService';
import DestroySupporterService from '@modules/supporters/services/supporter/DestroySupporterService';
import {
  SchemaCreate,
  SchemaUpdate,
} from '@modules/supporters/infra/http/controllers/validations/SupporterSchema';
import AppError from '@shared/errors/AppError';

class SupporterController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { supporter_id } = request.params;

    const showSupporter = container.resolve(ShowSupporterService);
    const supporter = await showSupporter.execute(supporter_id);

    return response.json(classToClass(supporter));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaCreate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { route_id } = request.params;

    const { name, phone, services, link, point } = request.body;

    const createSupporter = container.resolve(CreateSupporterService);

    const supporter = await createSupporter.execute({
      user_id,
      route_id,
      name,
      phone,
      services,
      link,
      point,
    });

    return response.json(classToClass(supporter));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaUpdate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { supporter_id } = request.params;

    const { name, phone, services, link, point } = request.body;

    const updateSupporter = container.resolve(UpdateSupporterService);

    const supporter = await updateSupporter.execute({
      user_id,
      supporter_id,
      name,
      phone,
      link,
      services,
      point,
    });

    return response.json(classToClass(supporter));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { supporter_id } = request.params;

    const deleteSupporter = container.resolve(DestroySupporterService);

    await deleteSupporter.execute(user_id, supporter_id);

    return response.json({ message: 'Supporter has be deleted' });
  }
}

export default new SupporterController();
