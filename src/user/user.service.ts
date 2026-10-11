import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

  constructor(

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,

  ) {}


  async createUser(user: CreateUserDto) {

    const hashedPassword =
      await bcrypt.hash(user.password, 10);


    const newUser = {
      ...user,
      password: hashedPassword,
    };


    return this.userRepository.save(newUser);

  }



  async login(loginDto: LoginDto) {


    const user =
      await this.userRepository.findOne({
        where:{
          email: loginDto.email,
        },
      });



    if(!user){

      throw new HttpException(
        'User not found',
        HttpStatus.NOT_FOUND,
      );

    }



    const isPassword =
      await bcrypt.compare(
        loginDto.password,
        user.password,
      );



    if(!isPassword){

      throw new HttpException(
        'Invalid password',
        HttpStatus.UNAUTHORIZED,
      );

    }



    const payload = {
      id:user.id,
      email:user.email,
    };



    return {

      id:user.id,

      email:user.email,

      name:user.name,


      access_token:
        this.jwtService.sign(
          payload,
          {
            secret:'secretKey',
          },
        ),

    };


  }


}