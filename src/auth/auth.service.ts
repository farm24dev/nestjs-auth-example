import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }


  async validateUser(email: string, password: string): Promise<any> {
    console.log('validateUser')
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        email: user.email,
        userId: user._id,
      };
    }
    return null;
  }


  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
