import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { contant } from './contant';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UserModule,
    JwtModule.register({ secret: contant.secret })
  ],
  providers: [AuthService, UserService, JwtModule, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
