import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('SuccessInterceptor before'); //before의 경우 미들웨어에서 보통 처리하므로 잘안씀 주석처리
    // const now = Date.now();
    return next
      .handle()
      .pipe(
        // tap(() => console.log('SuccessInterceptor after', Date.now() - now)),
        map((data) => ({ 
          success: true, 
          data 
        })),
      );
  }
}