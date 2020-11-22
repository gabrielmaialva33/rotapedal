import { Repository, getRepository, Raw } from 'typeorm';

import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import ICreateSupporterDTO from '@modules/supporters/dtos/ICreateSupporterDTO';
import Supporter from '../entities/Supporter';

class SupportersRepository implements ISupportersRepository {
  private ormRepository: Repository<Supporter>;

  constructor() {
    this.ormRepository = getRepository(Supporter);
  }

  public async create({
    user_id,
    route_id,
    name,
    phone,
    services,
    link,
    logo,
    point,
  }: ICreateSupporterDTO): Promise<Supporter> {
    const supporter = this.ormRepository.create({
      user_id,
      route_id,
      name,
      phone,
      logo,
      services,
      link,
      point,
    });
    await this.ormRepository.save(supporter);
    return supporter;
  }

  public async save(supporter: Supporter): Promise<Supporter> {
    await this.ormRepository.save(supporter);

    return supporter;
  }

  public async destroy(supporter: Supporter): Promise<Supporter> {
    return this.ormRepository.remove(supporter);
  }

  public async findSupporterById(
    supporter_id: string,
  ): Promise<Supporter | undefined> {
    const supporter = await this.ormRepository.findOne({
      where: { id: supporter_id },
    });
    return supporter;
  }

  // ? Raw create ILIKE query
  public async findSupporterByName(
    name: string,
  ): Promise<Supporter | undefined> {
    const supporter = await this.ormRepository.findOne({
      name: Raw(alias => `${alias} ILIKE '%${name}%'`),
    });
    return supporter;
  }

  public async findSupportByPhoneNumber(
    phone: string,
  ): Promise<Supporter | undefined> {
    const supporter = await this.ormRepository.findOne({
      where: { phone },
    });
    return supporter;
  }

  public async findSupportByLink(link: string): Promise<Supporter | undefined> {
    const supporter = await this.ormRepository.findOne({
      where: { link },
    });
    return supporter;
  }

  public async listAllSupporterByRoute(
    route_id: string,
  ): Promise<Supporter[] | undefined> {
    const supporters = this.ormRepository
      .createQueryBuilder('supporters')
      .select([
        'supporters.id',
        'supporters.user_id',
        'supporters.route_id',
        'supporters.name',
        'supporters.phone',
        'supporters.services',
        'supporters.logo',
        'supporters.link',
        'supporters.point',
      ])
      .where({ route_id })
      .getMany();

    return supporters;
  }

  public async listAllSupporter(): Promise<Supporter[] | undefined> {
    const supporters = this.ormRepository
      .createQueryBuilder('supporters')
      .select([
        'supporters.id',
        'supporters.user_id',
        'supporters.route_id',
        'supporters.name',
        'supporters.phone',
        'supporters.services',
        'supporters.logo',
        'supporters.link',
        'supporters.point',
      ])
      .getMany();

    return supporters;
  }
}

export default SupportersRepository;
