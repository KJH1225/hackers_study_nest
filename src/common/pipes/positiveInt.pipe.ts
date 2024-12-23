import { PipeTransform, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    if(value < 0) {
      console.log('PositiveIntPipe failed: ', value);
      throw new HttpException('value > 0', 400);
    }
    console.log('PositiveIntPipe success: ', value);
    return value;
  }
}