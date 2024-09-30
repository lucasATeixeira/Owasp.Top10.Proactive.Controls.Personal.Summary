import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './modules/authentication/authentication.guard';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { WorkspacePoliciesModule } from './modules/workspace-policies/workspace-policies.module';

@Module({
  imports: [
    UsersModule,
    AuthenticationModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    WorkspacesModule,
    WorkspacePoliciesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
