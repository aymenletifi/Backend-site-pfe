import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { userDTO } from 'src/users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      let ret = (result as any)._doc;
      delete ret["password"];
      return ret;
    }
    return null;
  }

  async login(user: any) {
    // Edit payload here.
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
