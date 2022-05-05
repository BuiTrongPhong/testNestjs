import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { EntityManager, Repository } from 'typeorm';
import { Order } from './order.entity';
import { ProductModule } from '../product/product.module'
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Product)
        private productReponsitory: Repository<Product>,
        @InjectRepository(User)
        private userReponsitory: Repository<User>,
        @InjectRepository(Order)
        private orderReponsitory: Repository<Order>

    ) { }

    async createOrder(idUser: number, idProduct: Array<number>): Promise<void> {
        const order = new Order()
        const products = await this.productReponsitory.findByIds(idProduct)
        const user = await this.userReponsitory.findOne({
            where: {
                id: idUser
            }
        })
        order.products = [...products]
        if (!user) {
            throw new HttpException('User not Exist', 200)
        }
        order.user = user
        await this.orderReponsitory.save(order)
    }
    async getOrder(): Promise<Array<Order>> {
        const order = await this.orderReponsitory.createQueryBuilder('order').leftJoinAndSelect('order.products','a').getMany()
        return order
    }
    async deleteOrder(idOrder: number): Promise<void>{
        const order = await this.orderReponsitory.findOne({where: {
            id: idOrder
        }})
        await this.orderReponsitory.remove(order)

    }
}
