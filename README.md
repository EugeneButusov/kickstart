# Kickstart

Kickstart is a monorepo boilerplate based on TS to start building something cool.

## Features

- [X] Monorepo based on [NX](https://nx.dev)
- [X] [Docker image build](#docker-image-building)
- [X] Backend/API implemented using [NestJS](https://nestjs.com/)
- [X] [OpenAPI integration](#openapi-integration)
- [ ] Microservices support
- [ ] Authentication/Authorization
- [ ] DB integration
- [ ] Pagination
- [ ] Health checks
- [ ] Monitoring
- [ ] User management
- [X] [Role-based access control](#role-based-access-control)
- [ ] Webhooks support

## Docker image building

### API

To build backend part, simply run `npx nx docker-build kickstart`.

## OpenAPI Integration

This boilerplate supports NestJS built-in OpenAPI/Swagger implementation available at http://localhost:3333/api/.

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
