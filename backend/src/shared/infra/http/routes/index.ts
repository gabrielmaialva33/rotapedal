import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';
import teamsRouter from '@modules/users/infra/http/routes/teams.routes';
import usersTeamsRoutes from '@modules/users/infra/http/routes/users.teams.routes';
import bikesRouter from '@modules/users/infra/http/routes/bikes.routes';
import routesRoutes from '@modules/routes/infra/http/routes/routes.routes';
import supportersRoutes from '@modules/supporters/infra/http/routes/supporters.routes';
import eventsRoutes from '@modules/supporters/infra/http/routes/events.routes';

const routes = Router();

//* Routes
routes.use('/routes', routesRoutes);

//* Users
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', profilesRouter);
routes.use('/teams', teamsRouter);
routes.use('/users/teams', usersTeamsRoutes);
routes.use('/users', bikesRouter);

//* supoporters
routes.use('/supporters', supportersRoutes);
routes.use('/events', eventsRoutes);

export default routes;
