import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  id: string;
  name: string;
  email: string;

  @Exclude() // исключает
  password: string;

  @Exclude() // исключает
  createdAt: Date;

  updatedAt: Date;
  roles: Role[];

  constructor(user: User) {
    Object.assign(this, user);
  }
}
