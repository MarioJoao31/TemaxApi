// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Correct import

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  //nao usamos 
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
