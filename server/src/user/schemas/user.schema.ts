import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../role/schemas/role.schema';
import { IsPhoneNumber } from 'class-validator';
import { Address } from '../../address/schemas/address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @ApiProperty({ example: 'Tom', description: 'First Name' })
    @Prop({ default: null })
    first_name: string;

    @ApiProperty({ example: 'Jackson', description: 'Last Name' })
    @Prop({ default: null })
    last_name: string;

    @ApiProperty({ example: 'user@mail.ru', description: 'E-mail' })
    @Prop({ required: true, unique: true })
    email: string;

    @ApiProperty({ example: 'qwerty123', description: 'Password' })
    @Prop({ required: true })
    password: string;

    @ApiProperty({ example: Types.ObjectId, description: 'Role' })
    @Prop({ type: Types.ObjectId, unique: false })
    role: Types.ObjectId;

    @ApiProperty({ example: '+79999999999', description: 'Phone number' })
    @IsPhoneNumber('RU', { message: 'Некорректный номер телефона' })
    @Prop({ default: null })
    phone: string;

    @ApiProperty({ example: '+79999999999', description: 'Phone number' })
    @Prop({ default: null })
    cart: string;

    @ApiProperty({
        example: [Address],
        description: 'Массив адресов пользователя для доставки',
    })
    @Prop({ default: [] })
    addresses: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullname').get(function () {
    return `${this.first_name} ${this.last_name}`;
});

UserSchema.set('toJSON', { getters: true });
