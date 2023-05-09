import { Injectable } from '@nestjs/common';
// @ts-ignore
import { User } from './user.entity';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {


  async findOne(username: string): Promise<User> {

    return await User.findOne({
      where: { email: username },
      select: {
        id: true,
        role: true,
        email: true,
        password: true,
      },
    });
  }
}
