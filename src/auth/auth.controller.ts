import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authSevice: AuthService){}
    @Post('/login')
    async login(@Body() dataPost: {email: string, password: string}){
        const token = await this.authSevice.login(dataPost)
        return {
            statusCode:201,
            message: 'success',
            data: token
        }
    }
}
