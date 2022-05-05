import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userReponsitory: Repository<User>) { }
    async creatUser(lastName: string, firstName: string, email: string, password: string): Promise<User> {
        let isEmailExist = await this.userReponsitory.find({ email: email })
        if (isEmailExist.length !== 0) {
            throw new HttpException('Email is exist', 200)
        }
        const user = new User()
        user.firstName = firstName
        user.lastName = lastName
        user.email = email
        user.password = password
        await this.userReponsitory.save(user)
        return

    }
    findAll(): Promise<User[]> {
        return this.userReponsitory.createQueryBuilder('user').leftJoinAndSelect('user.orders', 'order').getMany()
    }
    async editUser(id: number, firstName?: string, lastName?: string, password?: string): Promise<User> {
        const user = await this.userReponsitory.findOne({
            where: {
                id: id
            }
        })
        if (!user) {
            throw new HttpException('Id not Exist', 200)
        }
        if (firstName) {
            user.firstName = firstName
        }
        if (lastName) {
            user.lastName = lastName
        }
        if( password ){
            user.password = password
        }
        await this.userReponsitory.save(user)
        return user
    }
    async deleteUser(id: number): Promise<void> {
        const user = await this.userReponsitory.findOne({
            where: {
                id: id
            }
        })
        if (!user) {
            throw new HttpException('Id not Exist', 200)
        }
        await this.userReponsitory.remove(user)
        return
    }
}