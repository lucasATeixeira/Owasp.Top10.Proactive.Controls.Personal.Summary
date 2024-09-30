import { UsersService } from './users.service';
import { MemoryUsersRepository } from './repositories/memory-users.repository';

const STRONG_PASSWORD = 'Abcd123@';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    usersService = new UsersService(new MemoryUsersRepository());
  });

  describe('register', () => {
    describe('When user Register', () => {
      it('should return a user', async () => {
        const user = await usersService.register({
          email: 'test@test.com',
          name: 'Test',
          password: STRONG_PASSWORD,
        });

        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
      });
      it('should hava a role', async () => {
        const user = await usersService.register({
          email: 'test@test.com',
          name: 'Test',
          password: STRONG_PASSWORD,
        });

        expect(user.role).toBeDefined();
      });
      it('should not return the password', async () => {
        const user = await usersService.register({
          email: 'test@test.com',
          name: 'Test',
          password: STRONG_PASSWORD,
        });

        expect(user.password).not.toBeDefined();
      });
    });

    describe('When try to register with an existing email', () => {
      it('should return an error', async () => {
        await usersService.register({
          email: 'test@test.com',
          name: 'Test',
          password: STRONG_PASSWORD,
        });

        await expect(
          usersService.register({
            email: 'test@test.com',
            name: 'Test2',
            password: STRONG_PASSWORD,
          }),
        ).rejects.toThrow('Email already in use');
      });
    });

    describe('When try to register with an week password', () => {
      it('should return an error', async () => {
        await expect(
          usersService.register({
            email: 'test@test.com',
            name: 'Test',
            password: 'Abcd123',
          }),
        ).rejects.toThrow(
          'Week password, your password must meet the following criteria: At least 8 characters in length, At least one uppercase letter (A-Z), At least one lowercase letter (a-z), At least one digit (0-9), At least one special character (@, $, !, %, *, ?, &)',
        );
      });
    });
  });
});
