import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
    _id: Types.ObjectId;

    @ApiProperty({ example: 'Admin', description: 'User role value' })
    @Prop({ required: true, unique: false })
    value: string;

    @ApiProperty({
        example: 'Administrator',
        description: 'HomeRole description',
    })
    @Prop({ required: true })
    description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
