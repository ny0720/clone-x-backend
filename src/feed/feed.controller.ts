import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';

import { Request } from 'express';

import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';

import { AuthGuard } from '../auth/auth.guard';


interface AuthRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}



@Controller('feed')
export class FeedController {


  constructor(
    private readonly feedService: FeedService,
  ) {}



  @Post()
  @UseGuards(AuthGuard)
  createFeed(
    @Body() body: CreateFeedDto,
    @Req() req: AuthRequest,
  ) {


    return this.feedService.createFeed(
      body,
      req.user.id,
    );

  }




@Get()
@UseGuards(AuthGuard)
getFeeds() {

  return this.feedService.getFeedsWithUsers();

}




@Delete(':id')
@UseGuards(AuthGuard)
deleteFeed(
  @Param('id') id:number,
) {

  return this.feedService.deleteFeed(
    id,
  );

}

}