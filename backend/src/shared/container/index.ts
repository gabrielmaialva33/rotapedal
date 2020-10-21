import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProfilesRepository from '@modules/users/repositories/IProfilesRepository';
import ProfilesRepository from '@modules/users/infra/typeorm/repositories/ProfilesRepository';

import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import TeamsRepository from '@modules/users/infra/typeorm/repositories/TeamsRepository';

import IUsersTeamsRepository from '@modules/users/repositories/IUsersTeamsRepository';
import UsersTeamsRepository from '@modules/users/infra/typeorm/repositories/UsersTeamsRepository';

import IBikesRepository from '@modules/users/repositories/IBikesRepository';
import BikesRepository from '@modules/users/infra/typeorm/repositories/BikesRepository';

import IRoutesRepository from '@modules/routes/repositories/IRoutesRepository';
import RoutesRepository from '@modules/routes/infra/typeorm/repositories/RoutesRepository';

import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import SupportersRepository from '@modules/supporters/infra/typeorm/repositories/SupportersRepository';

import IEventsRepository from '@modules/supporters/repositories/IEventsRepository';
import EventsRepository from '@modules/supporters/infra/typeorm/repositories/EvensRepository';

//* USERS
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProfilesRepository>(
  'ProfilesRepository',
  ProfilesRepository,
);

container.registerSingleton<ITeamsRepository>(
  'TeamsRepository',
  TeamsRepository,
);

container.registerSingleton<IUsersTeamsRepository>(
  'UsersTeamsRepository',
  UsersTeamsRepository,
);

container.registerSingleton<IBikesRepository>(
  'BikesRepository',
  BikesRepository,
);

//* ROUTES
container.registerSingleton<IRoutesRepository>(
  'RoutesRepository',
  RoutesRepository,
);

//* SUPPORTER
container.registerSingleton<ISupportersRepository>(
  'SupportersRepository',
  SupportersRepository,
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);
