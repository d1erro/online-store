import { HttpException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schemas/cart.schema';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private cartRepository: Model<Cart>) {}

    create(dto: CreateCartDto) {
        try {
            return this.cartRepository.create(dto);
        } catch (e) {
            throw new HttpException(
                'Ошибка при добавлении товара в корзину',
                500,
            );
        }
    }

    findAll() {
        return `This action returns all cart`;
    }

    findOne(id: string) {
        try {
            return this.cartRepository.findOne({ _id: id });
        } catch (e) {
            throw new HttpException('Ошибка при поиске товара в корзине', 500);
        }
    }

    update(id: number, updateCartDto: UpdateCartDto) {
        return `This action updates a #${id} cart`;
    }

    remove(id: number) {
        return `This action removes a #${id} cart`;
    }
}
