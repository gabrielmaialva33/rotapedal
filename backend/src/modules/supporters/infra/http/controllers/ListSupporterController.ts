import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListRouteSupporterService from '@modules/supporters/services/supporter/ListRouteSupporterService';

class ListSupporterController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { route_id } = request.params;

    const listSupporter = container.resolve(ListRouteSupporterService);

    const supporters = await listSupporter.execute(route_id);

    return response.json(classToClass(supporters));
  }
}

export default new ListSupporterController();
