# Kickstart

Kickstart is a monorepo boilerplate based on TS to start building something cool.

## Features

- [X] Monorepo based on [NX](https://nx.dev)
- [X] [Docker image build](#docker-image-building)
- [X] Backend/API implemented using [NestJS](https://nestjs.com/)
- [X] [OpenAPI integration](#openapi-integration)
- [X] [Role-based access control](#role-based-access-control)
- [X] [Database integration](#database-integration)
- [X] [Authentication](#authentication)
- [X] [User management](#user-management)
- [ ] Microservices support
- [ ] Pagination
- [ ] Health checks
- [ ] Monitoring
- [ ] Webhooks support

## Docker image building

### API

To build backend part, simply run `npx nx docker-build kickstart`.

## OpenAPI Integration

Kickstart supports NestJS built-in OpenAPI/Swagger implementation available at http://localhost:3333/api/.

## Database Integration

Kickstart has database integration with [TypeORM](https://typeorm.io/). Built-in integration is configured to
work with [MongoDB](https://www.mongodb.com/). To avoid type-specific discrepancies of primary key in mongodb (
named `id` and cast to `String`)
using [MongoDB ObjectIdColumn decorator](libs/nest/common/database/src/mongodb/decorators/object-id-column.decorator.ts).

Basic database entity interface defined as follows:

```typescript
export interface Entity {
  id: string;
}

```

## Authentication

Kickstart uses [passport](https://www.passportjs.org/) framework for auth under the hood. Current implementation has
authentication using username/password pair, returning JWT, which can be used in further authorized requests. For more
details, please refer to OpenAPI docs (section `auth`).

_Sessions and JWT blacklisting is the subject of possible further development._

## User management

To support user management, Kickstart has the following basic entity:

```typescript
export interface User extends Entity {
  username: string;
  role: Role;
  hashedPassword: string;
}
```

Kickstart codebase also supports ability to create a user without any authentication, get/update authorized user's
profile based on passed credentials, get/list/update/delete any user for users having `role === Role.Admin`. For more
details, please refer to OpenAPI docs (section `users`).

## Role-based access control

Kickstart contains integrated RBAC with the following basic `Role` structure, which can be assigned to a user:

```typescript
export enum Role {
  Regular = 'regular',
  Admin = 'admin',
}
```

If route/controller must be restricted by some role, it can be done by combination of the following decorators:

```typescript
@Controller()
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Roles([Role.Admin])
class AdminRestrictedController {
  // TODO: your controller's logic
}
```

_More features TBD on demand._
