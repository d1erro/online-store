import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles-guard";
import { ValidationPipe } from "../pipes/validation.pipe";
import { CreateUserDto } from "./dto/create-user.dto";
import { GiveARoleDto } from "./dto/give-a-role.dto";
import { GiveAMemberStatusDto } from "./dto/give-a-member-status.dto";

@ApiTags("Users")
@Controller("/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Give a role" })
  @ApiResponse({ status: 200, type: User })
  @Roles("ADMIN")
  //@UseGuards(RolesGuard)
  @Post("role")
  async addRole(@Body() giveARoleDto: GiveARoleDto) {
    return this.usersService.giveARole(giveARoleDto);
  }

  @ApiOperation({ summary: "Give a member status" })
  @ApiResponse({ status: 200, type: User })
  //@Roles('ADMIN')
  //@UseGuards(RolesGuard)
  @Post("member")
  async addMemberStatus(@Body() dto: GiveAMemberStatusDto) {
    return this.usersService.giveMemberStatus(dto);
  }
}
