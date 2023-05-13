import { Controller, Get, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

interface loginUser {
  token: string;
  id: string;
  role: number;
  email: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async login(@Request() req): Promise<loginUser> {
    return {
      token: await this.authService.login(req.user),
      ...req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
