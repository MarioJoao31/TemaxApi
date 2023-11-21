// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'renatoHomoSec',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService], // Make sure JwtService is exported
})
export class AuthModule {}
