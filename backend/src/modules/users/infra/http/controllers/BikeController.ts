import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowBikeService from '@modules/users/services/bike/ShowBikeService';
import CreateBikeService from '@modules/users/services/bike/CreateBikeService';
import UpdateBikeService from '@modules/users/services/bike/UpdateBikeService';
import DestroyBikeService from '@modules/users/services/bike/DestroyBikeService';
import AppError from '@shared/errors/AppError';
import Schema from '@modules/users/infra/http/controllers/validations/BikeSchema';

class BikeController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showBike = container.resolve(ShowBikeService);

    const bikes = await showBike.execute(user_id);
    return response.json(classToClass(bikes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await Schema.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { nickname, model, manufacturing_date } = request.body;

    const createBike = container.resolve(CreateBikeService);

    const bike = await createBike.excute({
      user_id,
      nickname,
      model,
      manufacturing_date,
    });

    return response.json(classToClass(bike));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await Schema.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { bike_id } = request.params;
    const { nickname, model, manufacturing_date } = request.body;

    const updateBike = container.resolve(UpdateBikeService);

    const bike = await updateBike.execute({
      user_id,
      bike_id,
      nickname,
      model,
      manufacturing_date,
    });

    return response.json(classToClass(bike));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { bike_id } = request.params;

    const deleteBike = container.resolve(DestroyBikeService);

    await deleteBike.execute(bike_id, user_id);

    return response.json({ message: 'Bike has be deleted' });
  }
}

export default new BikeController();
