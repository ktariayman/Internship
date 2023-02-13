import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { UserDetails } from 'src/user/interface/user-details.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: NewUserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }
}
