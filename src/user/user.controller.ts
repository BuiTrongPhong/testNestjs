import { Body, Controller, Delete, Get, Param, Patch, Post,Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @Post()
    async createUser(@Body() postData : {lastName: string, firstName: string, email: string, password: string} ) {
        let {lastName, firstName, email, password} = postData
        await this.userService.creatUser(lastName, firstName, email, password)
        return {
            statusCode:201,
            message: 'Created'
        }
    }
    @Get()
    findAll() {
        return this.userService.findAll()
    }
    @Patch(':id')
    async editUser(@Body() pathData: {lastName?: string, firstName?: string, password?: string}, @Param() id: number){
        let {lastName, firstName, password} = pathData
        await this.userService.editUser(id,lastName,firstName, password)
        return {
            statusCode:202,
            message: 'Edited'
        }
    }
    @Delete(':id')
    async deleteUser(@Param() id: number){
        await this.userService.deleteUser(id)
        return {
            statusCode:204,
            message: 'Deleted'
        }
    }
    
}
