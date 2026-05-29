import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, originalUrl, body } = request;

    const start = Date.now();

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - start;
        this.logger.log(`${method} ${originalUrl} - ${duration}ms`, JSON.stringify(body || {}));
      }),
    );
  }
}
