import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthDto } from "./dto/auth.dto";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Authorization")
@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Sign In" })
  @ApiResponse({ status: 200, type: AuthDto })
  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: "Sign Up" })
  @ApiResponse({ status: 200, type: AuthDto })
  @Post("/reg")
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
