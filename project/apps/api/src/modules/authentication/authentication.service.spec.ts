import { AuthenticationService } from './authentication.service';
import { MemoryUsersRepository } from '../users/repositories/memory-users.repository';
import { User } from '~/db/types';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const STRONG_PASSWORD = 'Abcd123@';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let usersRepository: MemoryUsersRepository;
  let usersService: UsersService;
  let user: User;

  beforeEach(async () => {
    usersRepository = new MemoryUsersRepository();
    usersService = new UsersService(usersRepository);
    authenticationService = new AuthenticationService(
      usersRepository,
      new JwtService({ secret: 'secret' }),
    );
    user = await usersService.register({
      email: 'test@test.com',
      name: 'Test',
      password: STRONG_PASSWORD,
    });
  });

  describe('signIn', () => {
    describe('When user SignIn', () => {
      it('should return access token and refresh token', async () => {
        const response = await authenticationService.signIn({
          email: user.email,
          password: STRONG_PASSWORD,
        });

        expect(response).toBeDefined();
        expect(response.accessToken).toBeDefined();
        expect(response.refreshToken).toBeDefined();
      });
    });
    describe('When user SignIn with wrong password', () => {
      it('should return an Unauthorized error', async () => {
        await expect(
          authenticationService.signIn({
            email: user.email,
            password: 'wrong password',
          }),
        ).rejects.toThrow(UnauthorizedException);
      });
    });
    describe('When user SignIn with non existing email', () => {
      it('should return an Unauthorized error', async () => {
        await expect(
          authenticationService.signIn({
            email: 'wrong email',
            password: STRONG_PASSWORD,
          }),
        ).rejects.toThrow(UnauthorizedException);
      });
    });
  });
});
