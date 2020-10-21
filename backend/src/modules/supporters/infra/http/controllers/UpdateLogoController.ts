import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateLogoService from '@modules/supporters/services/supporter/UpdateLogoService';
import { classToClass } from 'class-transformer';

class UpdateLogoController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { supporter_id } = request.params;
      const updateSupporterLogo = container.resolve(UpdateLogoService);

      const supporter = await updateSupporterLogo.execute({
        user_id: request.user.id,
        supporter_id,
        logoFilename: request.file.filename,
      });

      return response.json(classToClass(supporter));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new UpdateLogoController();
