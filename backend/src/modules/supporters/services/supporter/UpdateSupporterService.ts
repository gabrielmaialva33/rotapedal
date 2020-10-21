import { injectable, inject } from 'tsyringe';

import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import Supporter from '@modules/supporters/infra/typeorm/entities/Supporter';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { IPoint } from '@modules/routes/infra/typeorm/entities/Route';

interface IRequest {
  supporter_id: string;
  user_id: string;
  name: string;
  phone: string;
  services: string;
  link: string;
  point: IPoint;
}

@injectable()
class UpdateSupporterService {
  constructor(
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    supporter_id,
    user_id,
    name,
    phone,
    services,
    link,
    point,
  }: IRequest): Promise<Supporter> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (!(user.role === ('supporter' || 'admin'))) {
      throw new AppError('User not permitted', 401);
    }

    const supporter = await this.supportersRepository.findSupporterById(
      supporter_id,
    );
    if (!supporter) {
      throw new AppError('Supporter not found', 404);
    }
    if (user_id !== supporter.user_id) {
      throw new AppError('User not owner');
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

    supporter.name = name;
    supporter.phone = phone;
    supporter.services = services;
    supporter.link = link;
    supporter.point = point;

    await this.supportersRepository.save(supporter);

    return supporter;
  }
}

export default UpdateSupporterService;
