import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { RolesService } from "../roles/roles.service";
import { GiveARoleDto } from "./dto/give-a-role.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { GiveAMemberStatusDto } from "./dto/give-a-member-status.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<User>,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const createdUser = new this.userRepository(dto);
    const role = await this.rolesService.getRoleByValue("USER");
    createdUser.roles = [role];
    await createdUser.save();
    return createdUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find().exec();
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async giveARole(dto: GiveARoleDto): Promise<User> {
    const user = await this.userRepository.findById(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);

    if (user.roles.some((elementRole) => elementRole.value === role.value)) {
      throw new HttpException(
        "This role already exists for the user",
        HttpStatus.FORBIDDEN,
      );
    }

    if (role && user) {
      await this.userRepository.findByIdAndUpdate(user, {
        $push: { roles: role },
      });
      user.roles.push(role);
      return user;
    }
  }

  async giveMemberStatus(dto: GiveAMemberStatusDto): Promise<User> {
    if (dto.secret_key == process.env.SECRET_MEMBER_KEY) {
      const user = await this.userRepository.findById(dto.userId);
      const role = await this.rolesService.getRoleByValue("MEMBER");

      if (user.roles.some((elementRole) => elementRole.value === role.value)) {
        throw new HttpException(
          "Member status already exists for the user",
          HttpStatus.FORBIDDEN,
        );
      }

      if (role && user) {
        await this.userRepository.findByIdAndUpdate(user, {
          $push: { roles: role },
        });
        user.roles.push(role);
        return user;
      }
    }

    throw new HttpException("Secret key is invalid", HttpStatus.BAD_REQUEST);
  }
}
