import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    createProduct(
        @Body() dto: CreateProductDto,
        @UploadedFiles() images: Array<Express.Multer.File>,
    ) {
        try {
            return this.productService.create(dto, images);
        } catch (e) {
            return e;
        }
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productService.getProductById(id);
    }
}
