import { injectable, inject } from 'tsyringe';

import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import ICreateSupporterDTO from '@modules/supporters/dtos/ICreateSupporterDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRoutesRepository from '@modules/routes/repositories/IRoutesRepository';
import Supporter from '@modules/supporters/infra/typeorm/entities/Supporter';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateSupporterService {
  constructor(
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoutesRepository')
    private routesRepository: IRoutesRepository,
  ) {}

  public async execute({
    user_id,
    route_id,
    name,
    phone,
    services,
    link,
    point,
  }: ICreateSupporterDTO): Promise<Supporter> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (!(user.role === ('supporter' || 'admin'))) {
      throw new AppError('User not permitted', 401);
    }

    const route = await this.routesRepository.findRouteById(route_id);
    if (!route) {
      throw new AppError('Route not exists', 404);
    }

    const checkSupporterNameExists = await this.supportersRepository.findSupporterByName(
      name,
    );
    if (checkSupporterNameExists) {
      throw new AppError('Supporter name already exists', 409);
    }

    const checkSupporterPhoneExists = await this.supportersRepository.findSupportByPhoneNumber(
      phone,
    );
    if (checkSupporterPhoneExists) {
      throw new AppError('Supporter phone already exists', 409);
    }

    const checkLinkExits = await this.supportersRepository.findSupportByLink(
      link,
    );
    if (checkLinkExits) {
      throw new AppError('Supporter link already exists', 409);
    }

    const supporter = await this.supportersRepository.create({
      user_id,
      route_id,
      name,
      phone,
      services,
      link,
      point,
    });
    return supporter;
  }
}

export default CreateSupporterService;
