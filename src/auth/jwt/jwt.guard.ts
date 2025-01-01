import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { // AuthGuard('jwt') 는 jwt.strategy.ts를 싷행해줌
  
}