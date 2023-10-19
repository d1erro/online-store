import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
    id: string;
    email: string;
    sub: {
        first_name: string;
        last_name: string;
    };
}

@Injectable()
export class CurrentUserJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        const userId: string = request.params.id;
        const userFromToken = this.jwtService.decode(token) as JwtPayload;

        if (userId && userFromToken) {
            return userId === userFromToken.id;
        }
        throw new UnauthorizedException();
    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
