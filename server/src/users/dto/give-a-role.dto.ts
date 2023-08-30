import { Schema } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class GiveARoleDto {
  @ApiProperty({ example: "ADMIN", description: "HomeRole value" })
  readonly value: string;

  @ApiProperty({
    example: "64c686c3febbc330872091d0",
    description: "User id for give a role",
  })
  readonly userId: string;
}
