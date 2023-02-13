import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { UserDetails } from 'src/user/interface/user-details.interface';
import { ExistUserDTO } from 'src/user/dto/exist-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { name, email, password } = user;
    const existUser = await this.userService.findByEmail(email);
    if (existUser) return 'email taken';
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.createUser(
      name,
      email,
      hashedPassword,
    );

    return this.userService.getProfileData(newUser);
  }

  async passwordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const userExist = !!user;
    if (!userExist) return null;
    const passwordMatch = await this.passwordMatch(password, user.password);
    if (!passwordMatch) return null;
    return this.userService.getProfileData(user);
  }

  async login(existUser: ExistUserDTO): Promise<{ token: string } | null> {
    const { email, password } = existUser;
    const user = await this.validateUser(email, password);
    if (!user) return null;
    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
