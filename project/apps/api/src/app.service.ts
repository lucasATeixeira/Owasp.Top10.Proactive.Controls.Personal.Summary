import { Injectable } from '@nestjs/common';
import { defineAbilityFor, User } from '@repo/authorization';
import { userSchema } from '@repo/authorization';

@Injectable()
export class AppService {
  getHello(): string {
    const user = {
      id: '1',
      role: 'PRO_USER',
    };

    const parsedUser = userSchema.parse(user);

    console.log(parsedUser);

    const { can } = defineAbilityFor(user as User);

    console.log(can('manage', 'all'));
    console.log(can('get', parsedUser));
    console.log(can('update', parsedUser));
    console.log(can('delete', parsedUser));
    console.log(
      can(
        'get',
        userSchema.parse({ id: '2', role: 'PRO_USER', __typename: 'User' }),
      ),
    );
    return 'Hello World!';
  }
}
