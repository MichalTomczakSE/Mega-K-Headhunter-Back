import { Injectable } from '@nestjs/common';
import { User } from './user.entity';


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
