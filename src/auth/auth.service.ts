import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private userService: UserService
    ) { }
    
    async validateUser(data): Promise<boolean> {
        const userExit = await this.userService.findOne(data.email)
        if (!userExit) {
            throw new HttpException('User not exist',200)
        }
        if(data.password!==userExit.password){
            throw new HttpException('Password is not correct',200)
        }
        return true
    }
    async login(user: {email: string, password: string}):Promise<any> {
        if(await this.validateUser(user)){
            const payload = {
                email: user.email
            }
            const token = this.jwtService.sign(payload)
            return this.jwtService.sign(payload)
        }

    }
    
}
