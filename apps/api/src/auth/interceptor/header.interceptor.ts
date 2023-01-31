import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class HeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        context
          .switchToHttp()
          .getResponse()
          .header('Access-Control-Allow-Origin', process.env.VITE_APP_URL);
      }),
    );
  }
}
