import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email, pass);
    const user = await this.usersService.findOne(email);
    console.log("user",user)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log("user2",user)
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log("-->",user)
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
