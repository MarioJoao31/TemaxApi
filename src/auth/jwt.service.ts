// jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  //atribui token ao user 
  signPayload(payload: any): string {
    return this.jwtService.sign(payload);
  }

  //implementar depois para verificar se o token existe 
  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
