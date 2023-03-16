# Kickstart

Kickstart is a monorepo boilerplate based on TS to start building something cool.

## Features

- [X] Monorepo based on [NX](https://nx.dev)
- [X] [Docker image build](#docker-image-building)
- [X] Backend/API implemented using [NestJS](https://nestjs.com/)
- [X] [OpenAPI integration](#openapi-integration)
- [X] [Role-based access control](#role-based-access-control)
- [ ] Database integration
- [ ] Authentication/Authorization
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

This boilerplate supports NestJS built-in OpenAPI/Swagger implementation available at http://localhost:3333/api/.

## Database Integration

This boilerplate has database integration with [TypeORM](https://typeorm.io/). Built-in integration is configured to
work with [MongoDB](https://www.mongodb.com/). To avoid type-specific discrepancies of primary key in mongodb (
named `id` and cast to `String`)
using [MongoDB ObjectIdColumn decorator](libs/nest/common/database/src/mongodb/decorators/object-id-column.decorator.ts).

Basic database entity interface defined as follows:

```typescript
export interface Entity {
  id: string;
}

```

## User management

To support user management, this boilerplate has the following basic entity:

```typescript
export interface User extends Entity {
  username: string;
  role: Role;
  hashedPassword: string;
}
```

Kickstart codebase also supports ability to create a user without any authentication, get/update authorized user's
profile based on passed credentials, get/list/update/delete any user for users having `role === Role.Admin`. For more
details, please refer to OpenAPI documentation.

## Role-based access control

This boilerplate contains integrated RBAC with the following basic `Role` structure, which can be assigned to a user:

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
