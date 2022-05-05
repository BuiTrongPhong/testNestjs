import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productReponsitory: Repository<Product>
    ){}
    async creatProduct(name: string, price: number, total: number): Promise<Product> {
        let isNameExist = await this.productReponsitory.find({ name: name })
        if (isNameExist.length !== 0) {
            throw new HttpException('Name is exist', 200)
        }
        const product = new Product()
        product.name = name
        product.price = price
        product.total = total
        await this.productReponsitory.save(product)
        return

    }
    findAll(): Promise<Product[]> {
        return this.productReponsitory.find()
    }
    async editProduct(id: number, name?: string, price?: number, total?: number): Promise<Product> {
        const product = await this.productReponsitory.findOne({
            where: {
                id: id
            }
        })
        if (!product) {
            throw new HttpException('Id not Exist', 200)
        }
        if (name) {
            product.name = name
        }
        if (total) {
            product.total = total
        }
        if( price ){
            product.price = price
        }
        await this.productReponsitory.save(product)
        return product
    }
    async deleteProduct(id: number): Promise<void> {
        const product = await this.productReponsitory.findOne({
            where: {
                id: id
            }
        })
        if (!product) {
            throw new HttpException('Id not Exist', 200)
        }
        await this.productReponsitory.remove(product)
        return
    }
}
