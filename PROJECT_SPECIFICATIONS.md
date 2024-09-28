# Description

A workspace-driven social media platform where users can subscribe to or create a workspace. Depending on their role and workspace policies, users can post or read content within the workspace.
It is also possible to ban a user from a workspace

# Technologies

- Turbo Repo
- API
  - NestJS
  - [Kysely](https://kysely.dev) ORM with Prisma for Schema management
  - SQLite
  - Crypto for encryption
- Web
  - [Next.js 14](https://nextjs.org/)
  - [NextAuth.js](https://next-auth.js.org/)
  - [next-safe-action](https://next-safe-action.dev/)
  - Shadcn UI
- Authorization management
  - [CASL](https://casl.js.org/v6/en)
- Automation
  - Github actions
  - GitRob
  - HarshiCorp Vault
  - OWASP Zap

# Data modeling

## User

Represents a user inside the system

| Field                 | Type   | Description                       |
| --------------------- | ------ | --------------------------------- |
| `id`                  | UUID   | Unique identifier                 |
| `name`                | String | Full name of the user             |
| `email`               | String | User's email address (unique)     |
| `role`                | String | System role                       |
| `password`            | String | Users's password                  |
| `passwordLastChanged` | Date   | Last Time a user changed password |

## Workspace

Represents a workspace which users can post and/or read other users posts

| Field     | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `id`      | UUID   | Unique identifier              |
| `name`    | String | Full name of the Workspace     |
| `slug`    | String | slug of the workspace (Unique) |
| `ownerId` | UUID   | User ID of the workspace owner |

## Workspace Role

Represents a role for a workspace

| Field         | Type   | Description                     |
| ------------- | ------ | ------------------------------- |
| `id`          | UUID   | Unique identifier               |
| `workspaceId` | UUID   | WorkspaceId                     |
| `name`        | String | Full name of the Workspace Role |

## Workspace membership

Indicates what type of membership a user has in a workspace

| Field         | Type | Description                           |
| ------------- | ---- | ------------------------------------- | -------- |
| `id`          | UUID | Unique identifier                     |
| `userId`      | UUID | User ID                               |
| `workspaceId` | UUID | workspace ID                          |
| `roleId`      | UUID | Which role user has in this workspace | nullable |

## Workspace Policies

Indicates the role permissions for the workspace

| Field         | Type   | Description                 |
| ------------- | ------ | --------------------------- | -------- |
| `id`          | UUID   | Unique identifier           |
| `workspaceId` | UUID   | workspace ID                |
| `roleId`      | UUID   | Ex: Role Id                 | nullable |
| `permissions` | String | Ex: create-Post,remove-Post |

## Workspace Post

Posts from workspace

| Field         | Type   | Description           |
| ------------- | ------ | --------------------- |
| `id`          | UUID   | Unique identifier     |
| `workspaceId` | UUID   | workspace ID          |
| `authorId`    | String | User Id               |
| `content`     | String | Max of 140 characters |
| `createdAt`   | String | creation date         |
| `updatedAt`   | String | update date           |

## Workspace Ban

| Field         | Type   | Description           |
| ------------- | ------ | --------------------- |
| `id`          | UUID   | Unique identifier     |
| `workspaceId` | UUID   | workspace ID          |
| `authorId`    | String | User Id               |
| `content`     | String | Max of 140 characters |
| `createdAt`   | String | creation date         |
| `updatedAt`   | String | update date           |

# Rules

## Business Rules

- User must have one of the following roles: ADMIN, PRO_USER, USER
- User can register using email and password.
- Users must update their passwords at least once every 30 days. The system should restrict access to certain features if the password is older than 30 days.\*\*
- Users nearing password expiry should be notified at regular intervals (e.g., one week before expiry and one day before expiry).\*\*
- Users can create new workspaces.
- When a user creates a workspace he will have a workspace membership record in the database with null roleId and owner true.
- Workspace Owners can set workspace policies for each user role.
- When a workspace is created it must be created a workspace policy with null roleId with default permissions.
- User cant create a workspace policy with empty roleId
- When creating a Workspace Role it must create a policy that is duplicated with the default permissions
- It is not possible to remove the default workspace policy (the one with null roleId)
- Users can subscribe to a workspace unless they are banned.
- When a user subscribe to a workspace he will have a workspace membership record in the database with null roleId.
- Users can create, read, update, and delete posts in a workspace, based on their role and workspace policies.
- Users with the appropriate permissions can ban other users.

## Infra Rules

- It must have a ABAC approach for authorization
  - Use [CASL](https://casl.js.org/v6/en)
- It must contain OAuth2 implementation?
  - [NextAuth.js](https://next-auth.js.org/)
- Implement Password Rotation
- It must implement encryption to sensitive data
  - Simetric encryption
  - Store key on environment variable or secret management
  - Store iv with data itself
- It must be able to handle key rotations
  - [Envelop encryption](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#enveloping)
- It must include input validation
- It must have logging
- It must contain headers for security
- It must apply [GitRob](https://github.com/michenriksen/gitrob) or [TruffleHog](https://github.com/trufflesecurity/trufflehog) for repo analysis
- It must use a secret management of some kind ([HarshiCorp Vault](https://www.hashicorp.com/products/vault) or [AWS Secret Manager](https://docs.aws.amazon.com/pt_br/secretsmanager/latest/userguide/intro.html))
- It must have Rate limiting
- It must implement Static Application Security Testing (SAST) and Software composition analysis
- It must have a CI/CD pipeline
- Implement [OWASP Zap](https://www.zaproxy.org/) on CI/CD Pipeline
