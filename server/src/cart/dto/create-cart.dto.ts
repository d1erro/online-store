// import { ApiProperty } from '@nestjs/swagger';
// import { IsNumber, IsNumberString, Length } from 'class-validator';
// import { Prop } from '@nestjs/mongoose';
//
// export class CreateCartDto {
//     @ApiProperty({
//         example: '653faa0ced83013ae4f4aae1',
//         description: 'ID продукта',
//     })
//     @Length(24, 24, {
//         message: '$property - Должно быть 24 символа',
//     })
//     @Prop({ required: true, unique: true })
//     productId: string;
//
//     @ApiProperty({
//         example: '3',
//         description: 'Количество товара',
//     })
//     @IsNumberString(
//         {},
//         {
//             message: '$property - Должно быть числом',
//         },
//     )
//     @Prop({ required: true })
//     count: string;
// }

import { Prop } from '@nestjs/mongoose';

export class CreateCartDto {
    @Prop({ required: true })
    cartItems: object[];
}
