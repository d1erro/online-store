import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [AuthService, JwtService],
    controllers: [AuthController],
    imports: [forwardRef(() => UserModule)],
    exports: [AuthService],
})
export class AuthModule {}
