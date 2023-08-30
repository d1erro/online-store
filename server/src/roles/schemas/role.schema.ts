import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/schemas/user.schema";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @ApiProperty({ example: "Admin", description: "User role value" })
  @Prop({ required: true, unique: true })
  value: string;

  @ApiProperty({
    example: "Administrator",
    description: "HomeRole description",
  })
  @Prop({ required: true })
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
