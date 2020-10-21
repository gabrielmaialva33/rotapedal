import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  /* A Tentativa aqui é desconectar o typeORM o maximo possível da aplicação */
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  /* O retorno de uma função asyncrona sempre é uma promise */
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create({
    name,
    email,
    password,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password, avatar });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async destroy(user: User): Promise<User> {
    return this.ormRepository.remove(user);
  }
}

export default UsersRepository;
