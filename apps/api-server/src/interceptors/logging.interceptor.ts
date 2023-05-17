import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger;
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const { method, url } = req;
    const now = Date.now();
    Logger.log(`Incoming request - ${method} ${url}`);
    return next.handle().pipe(
      tap({
        next: (): void => {
          Logger.log(`${now} request - ${method} ${url} success`);
        },
        error: (err: Error): void => {
          Logger.error(err, JSON.stringify(err.stack));
        },
      }),
      map((data) => {
        console.log(data);
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message,
          data: data,
        };
      }),
    );
  }
}
