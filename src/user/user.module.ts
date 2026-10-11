import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';



@Module({

  imports: [

    TypeOrmModule.forFeature([
      User
    ]),


    JwtModule.register({

      secret: 'secret123',

      signOptions: {
        expiresIn: '1h',
      },

    }),

  ],


  controllers: [
    UserController
  ],


  providers: [
    UserService
  ],

})


export class UserModule {}