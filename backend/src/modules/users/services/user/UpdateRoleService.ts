import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  email: string;
  user_id: string;
  role: string;
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, email, role }: IRequest): Promise<User> {
    if (!(role === 'user' || role === 'moderator' || role === 'supporter')) {
      throw new AppError('Input role not valid ', 400);
    }

    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (!(user.role === 'moderator' || user.role === 'admin')) {
      throw new AppError('Unauthorized user', 401);
    }

    const newUserRole = await this.userRepository.findByEmail(email);

    if (!newUserRole) {
      throw new AppError('Email not found', 404);
    }

    if (newUserRole.role === role) {
      throw new AppError('User is already role', 409);
    }

    newUserRole.role = role;

    return this.userRepository.save(newUserRole);
  }
}

export default UpdateRoleService;
