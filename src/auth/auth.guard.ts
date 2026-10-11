import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';


import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private jwtService: JwtService,
  ){}



  canActivate(
    context: ExecutionContext,
  ): boolean {


    const request =
      context.switchToHttp().getRequest();



    const authorization =
      request.headers.authorization;



    if(!authorization){

      throw new UnauthorizedException(
        'Token is required',
      );

    }



    const token =
      authorization.split(' ')[1];



    try{


      const payload =
        this.jwtService.verify(
          token,
          {
            secret:'secretKey',
          },
        );



      request.user = payload;



      return true;



    }catch(error){


      throw new UnauthorizedException(
        'Invalid token',
      );


    }


  }


}