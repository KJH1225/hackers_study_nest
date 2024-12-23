import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getAllCats(): string {
    return 'all cats';
  }
}
