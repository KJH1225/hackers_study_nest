import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/catsRequestDto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';


@Injectable()
export class CatsService {
  constructor(
    // @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllCat() {
    // const cats = await this.catModel.find();
    return 'all cat';
  }

  async signUp(body: CatRequestDto) {
    const {email, name, password} = body;
    const isCatExist = await this.catsRepository.existsByEmail(email); // exists 이미 존재하는 고양이인지 확인
    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이가 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  // async login(body: LoginRequestDto) {
    
  // }

  async logout() {
    return 'logout';
  }
}
