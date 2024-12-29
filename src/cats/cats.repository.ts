import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat } from "./cats.schema";
import { CatRequestDto } from "./dto/catsRequestDto";

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    // 스키마에서 validationError 처리하여 try catch 주석
    // try { 
      const result = await this.catModel.exists({ email });
      return result ? true : false; //Mongoose v6+ 에서 exists()는 존재하면 { _id: ObjectId } 객체 존재하지 않으면 null을 반환
    // } catch (error) {
    //   throw new HttpException('db error', 400);
    // }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
