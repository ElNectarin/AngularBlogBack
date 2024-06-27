import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (user && user.password) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: User): Promise<any> {
    console.log('user', user);
    const payload = {
      username: user.dataValues.userName,
      sub: user.dataValues.id,
    };
    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
