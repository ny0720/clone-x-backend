import { Injectable } from '@nestjs/common';

import { CreateFeedDto } from './dto/create-feed.dto';

import { Feed } from './feed.entity';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../user/user.entity';



@Injectable()
export class FeedService {


  constructor(

    @InjectRepository(Feed)
    private feedRepository: Repository<Feed>,


    @InjectRepository(User)
    private userRepository: Repository<User>,

  ) {}



  // 피드 생성
  async createFeed(
    feed: CreateFeedDto,
    userId: number,
  ) {


    const user =
      await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });



    if (!user) {

      throw new Error('User not found');

    }



    const newFeed =
      this.feedRepository.create({

        content: feed.content,

        user: user,

      });



    return await this.feedRepository.save(newFeed);

  }





  // 피드 조회 (User 포함)
  async getFeedsWithUsers() {


    const feeds =
      await this.feedRepository.find({

        relations: {
          user: true,
        },

        order: {
          created_at: 'DESC',
        },

      });



    const feedsWithUserInfo =
      feeds.map((feed) => ({

        id: feed.id,

        content: feed.content,

        created_at: feed.created_at,

        user: {

          id: feed.user.id,

          name: feed.user.name,

        },

      }));



    return feedsWithUserInfo;

  }





  // 피드 삭제
  async deleteFeed(
    id: number,
  ) {


    return await this.feedRepository.delete(id);

  }


}