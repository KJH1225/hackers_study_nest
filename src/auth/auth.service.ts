import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    // 해당하는 이메일이 있는지 확인
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 패스워드를 확인해주세요.');
    }

    // 패스워드 일치 여부 확인
    const isPasswordValidated: boolean = await bcrypt.compare(
      password, 
      cat.password
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 패스워드를 확인해주세요.');
    }

    // JWT 토큰 발급
    const payload = { email: email, sub: cat.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
