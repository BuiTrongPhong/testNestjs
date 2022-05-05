import { Body, Controller, Post } from '@nestjs/common';
import { DataTypeNotSupportedError } from 'typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private producService: ProductService){}
    @Post()
    async creatProduct(@Body() dataPost: {name: string, price: number, total: number}) {
        const {name, price, total} = dataPost
        await this.producService.creatProduct(name, price, total)
        return {
            statusCode: 201,
            message: 'success'
        }
    }
}
