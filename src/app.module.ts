import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';


import { UserModule } from './user/user.module';

import { FeedModule } from './feed/feed.module';


import { User } from './user/user.entity';

import { Feed } from './feed/feed.entity';



@Module({

imports:[


TypeOrmModule.forRoot({

type:'mysql',

host:'34.50.6.107',

port:3306,

username:'나윤',

password:'a7131226118@',

database:'twitter',


entities:[

User,
Feed,

],


synchronize:true,


}),



JwtModule.register({

secret:'secretKey',

signOptions:{

expiresIn:'1h',

},

}),



UserModule,

FeedModule,


],


providers:[],


})

export class AppModule {}