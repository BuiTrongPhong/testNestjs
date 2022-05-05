import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService ){}
    @Post()
    async createOrder(@Body() dataBody: {idUser: number, listIdProduct: Array<number>}) {
        await this.orderService.createOrder(dataBody.idUser,dataBody.listIdProduct)
    }
    @Get()
    async getOrder() {
        return {
            statusCode:202,
            message: 'Edited',
            data: await this.orderService.getOrder()
        }
    }
    @Delete(':id')
    async deleteOrder(@Param() id: number) {
        console.log(id)
        await this.orderService.deleteOrder(id)
        return {
            statusCode:202,
            message: 'deleted'
        }
    }
}
