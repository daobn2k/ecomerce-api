import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const { method, ip, url } = request;

    const now: number = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response: Response = context.switchToHttp().getResponse();

        const delay: number = Date.now() - now;

        const message = `${method} ${url} ${response.statusCode} - ${ip} +${delay}ms`;

        if (delay > 1000) {
          return this.logger.warn(message);
        }
      }),
    );
  }
}
