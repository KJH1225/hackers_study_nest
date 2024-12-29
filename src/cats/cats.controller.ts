import { 
  Controller, 
  Get, 
  Post,
  UseInterceptors, 
  Body
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/catsRequestDto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/catDto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('all')
  @ApiOperation({ summary: '모든 고양이 정보 가져오기' })
  getAllCat() {
    return this.catsService.getAllCat();
  }

  @Get()
  @ApiOperation({ summary: '현재 고양이 정보 가져오기' })
  getCurrentCat() {
    return 'current cat';
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

  // @Post('login')
  // @ApiOperation({ summary: '로그인' })
  // async login(@Body() body: LoginRequestDto) {
  //   return await this.catsService.login(body);
  // }

  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  async logout() {
    return await this.catsService.logout();
  }

  @Post('upload/cats')
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  uploadCatImg() {
    return 'uploadImg';
  }
}
