import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
    @Prop({ required: true })
    cartItems: object[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
