import { 
  Controller, 
  Get, 
  Post,
  UseInterceptors, 
  Body,
  UseFilters,
  UseGuards,
  Req
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/catsRequestDto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/catDto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorators';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get('all')
  @ApiOperation({ summary: '모든 고양이 정보 가져오기' })
  getAllCat() {
    return this.catsService.getAllCat();
  }

  @Get()
  @ApiOperation({ summary: '현재 고양이 정보 가져오기' })
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentUser() cat) { // @CurrentUser() 커스텀 데코레이터? 
    return cat.readOnlyData;
  }

  @Post()
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiResponse({
    status: 200,
    description: '회원가입 완료',
    type: ReadOnlyCatDto,
  })
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  async login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  // 프론트엔드에서 jwt 제거시 로그아웃 -> 로그아웃 필요없어 주석
  // @Post('logout')
  // @ApiOperation({ summary: '로그아웃' })
  // async logout() {
  //   return await this.catsService.logout();
  // }

  @Post('upload/cats')
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  uploadCatImg() {
    return 'uploadImg';
  }
}
