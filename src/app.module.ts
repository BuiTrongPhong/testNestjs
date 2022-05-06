import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { authMiddleaware } from './auth/auth.middleware';
@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    "autoLoadEntities": true
  }), ProductModule, OrderModule, AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleaware)
      .exclude(
        {
          path: 'user', method: RequestMethod.POST
        },
        {
          path: 'auth/login', method: RequestMethod.POST
        })
      .forRoutes('*')
  }
}