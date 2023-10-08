import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/schemas/role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @ApiProperty({ example: 'Tom', description: 'First Name' })
    @Prop({ required: true })
    first_name: string;

    @ApiProperty({ example: 'Harrison', description: 'Last Name' })
    @Prop({ required: true })
    last_name: string;

    @ApiProperty({ example: 'user@mail.ru', description: 'E-mail' })
    @Prop({ required: true, unique: true })
    email: string;

    @ApiProperty({ example: 'qwerty123', description: 'Password' })
    @Prop({ required: true })
    password: string;

    @ApiProperty()
    @Prop({ ref: 'Role' })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullname').get(function () {
    return `${this.first_name} ${this.last_name}`;
});

UserSchema.set('toJSON', { getters: true });
