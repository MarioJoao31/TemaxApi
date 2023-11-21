// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const jwtToken = request.headers['authorization'];

    if (!jwtToken) {
      return false;
    }

    const user = this.jwtService.verifyToken(jwtToken);

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
