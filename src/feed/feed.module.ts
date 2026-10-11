import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

import { Feed } from './feed.entity';
import { User } from '../user/user.entity';

import { AuthGuard } from '../auth/auth.guard';


@Module({

  imports: [

    TypeOrmModule.forFeature([
      Feed,
      User,
    ]),


    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: '1h',
      },
    }),

  ],


  controllers: [
    FeedController,
  ],


  providers: [
    FeedService,
    AuthGuard,
  ],


  exports: [
    AuthGuard,
  ],

})

export class FeedModule {}