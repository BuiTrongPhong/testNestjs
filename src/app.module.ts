import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    "autoLoadEntities": true
  }), ProductModule, OrderModule],
})
export class AppModule { }