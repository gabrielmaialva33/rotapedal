import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowRouteService from '@modules/routes/services/ShowRouteService';
import CreateRouteService from '@modules/routes/services/CreateRouteService';
import UpdateRouteService from '@modules/routes/services/UpdateRouteService';
import DestroyRouteService from '@modules/routes/services/DestroyRouteService';
import {
  SchemaCreate,
  SchemaUpdate,
} from '@modules/routes/infra/http/controllers/validations/RouteSchema';
import AppError from '@shared/errors/AppError';

class RouteController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showRoute = container.resolve(ShowRouteService);
    const routes = await showRoute.execute();
    return response.json(classToClass(routes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaCreate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const {
      name,
      extension,
      elevation,
      difficult,
      stop_points,
      point_A,
      point_B,
    } = request.body;

    const createRoute = container.resolve(CreateRouteService);
    const route = await createRoute.execute({
      user_id,
      name,
      extension,
      elevation,
      difficult,
      stop_points,
      point_A,
      point_B,
    });

    return response.json(classToClass(route));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    //* schema validation
    if (!(await SchemaUpdate.isValid(request.body))) {
      throw new AppError('Validation fails', 400); //! validation not pass
    }

    const user_id = request.user.id;
    const { route_id } = request.params;
    const {
      name,
      extension,
      elevation,
      difficult,
      stop_points,
      point_A,
      point_B,
    } = request.body;

    const updateRoute = container.resolve(UpdateRouteService);

    const route = await updateRoute.execute({
      user_id,
      route_id,
      name,
      extension,
      elevation,
      difficult,
      stop_points,
      point_A,
      point_B,
    });

    return response.json(classToClass(route));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { route_id } = request.params;

    const deleteRoute = container.resolve(DestroyRouteService);

    await deleteRoute.execute(route_id, user_id);

    return response.json({ message: 'Route has be deleted' });
  }
}

export default new RouteController();
