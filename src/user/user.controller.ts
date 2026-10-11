import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('users')
export class UserController {


  constructor(
    private userService: UserService,
  ) {}



  @Post()
  createUser(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
    }
  ) {

    return this.userService.createUser(body);

  }




  @Post('login')
  login(
    @Body()
    body: {
      email: string;
      password: string;
    }
  ) {

    return this.userService.login(body);

  }


}