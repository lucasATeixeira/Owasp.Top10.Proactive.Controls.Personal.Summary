import { User } from '~/db/types';

export class RegisterUserResponseDto {
  accessToken: string;
  refreshToken: string;
  user: User;
}
