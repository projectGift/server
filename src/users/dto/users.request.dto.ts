import { UsersEntity } from '../users.entity';
import { PickType } from '@nestjs/swagger';

export class RequestUserDto extends PickType(UsersEntity, [
  'email',
  'password',
] as const) {}
