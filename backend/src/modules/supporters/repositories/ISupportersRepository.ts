import ICreateSupporterDTO from '../dtos/ICreateSupporterDTO';
import Supporter from '../infra/typeorm/entities/Supporter';

export default interface ISupportersRepository {
  create(data: ICreateSupporterDTO): Promise<Supporter>;
  save(supporter: Supporter): Promise<Supporter>;
  destroy(supporter: Supporter): Promise<Supporter>;
  findSupporterById(supporter_id: string): Promise<Supporter | undefined>;
  findSupporterByName(name: string): Promise<Supporter | undefined>;
  findSupportByPhoneNumber(phone: string): Promise<Supporter | undefined>;
  findSupportByLink(link: string): Promise<Supporter | undefined>;
  listAllSupporterByRoute(route_id: string): Promise<Supporter[] | undefined>;
}
