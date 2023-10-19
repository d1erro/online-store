import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumberString, Length } from 'class-validator';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
    @ApiProperty({
        example: Types.ObjectId,
        description: 'ID пользователя, которому принадлежит адрес',
    })
    @Prop({ types: Types.ObjectId })
    userId: Types.ObjectId;

    @ApiProperty({
        example: 'Ленинградская область',
        description: 'Регион доставки',
    })
    @Length(1, 32, {
        message: '$property - Не меньше 1 и не больше 32 символов',
    })
    @Prop({ default: null })
    region: string;

    @ApiProperty({ example: 'Выборг', description: 'Город доставки' })
    @Length(1, 32, {
        message: '$property - Не меньше 1 и не больше 32 символов',
    })
    @Prop({ default: null })
    city: string;

    @ApiProperty({
        example: 'ул. Ленина, д. 1, кв. 2',
        description: 'Улица, дом, квартира',
    })
    @Length(1, 32, {
        message: '$property - Не меньше 1 и не больше 32 символов',
    })
    @Prop({ default: null })
    street: string;

    @ApiProperty({ example: 123456, description: 'Индекс доставки' })
    @IsNumberString({}, { message: '$property - Должен быть числом' })
    @Length(6, 6, {
        message: '$property - Должно быть 6 символов',
    })
    @Prop({ default: null })
    index: string;

    @ApiProperty({ example: true, description: 'Адрес по умолчанию?' })
    @IsBoolean({})
    @Prop({ default: true })
    default: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
