import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const url = request.originalUrl || request.url || '';

    // ڕێڕەوە گشتییەکان ڕاستەوخۆ دەرباز دەبن بەبێ پشکنینی پاسپۆرت
    if (
      url.includes('/health') ||
      url.includes('/channels') ||
      url.includes('/ingestion') ||
      url.includes('/public')
    ) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const url = request.originalUrl || request.url || '';

    if (
      url.includes('/health') ||
      url.includes('/channels') ||
      url.includes('/ingestion') ||
      url.includes('/public')
    ) {
      return user || {};
    }

    if (err || !user) {
      throw err || new UnauthorizedException('دەسەڵاتی بینینی ئەم بەشەت نییە، تکایە سەرەتا بچۆ ژوورەوە');
    }
    return user;
  }
}
