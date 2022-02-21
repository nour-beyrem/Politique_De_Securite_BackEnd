/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddUserDto } from 'src/DTO/user/addUser';
import { LoginCredentialsDto } from 'src/DTO/user/loginUser';
import { updateUserDto } from 'src/DTO/user/updateUser';
import { UserEntity } from 'src/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from './user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<UserEntity[]> {
       return this.userService.getUsers(user);
    }


    @Get(':username')
    @UseGuards(JwtAuthGuard)
    async getUserById(
      @Param('username') username: string, @User() user
    ): Promise<UserEntity>{
      const user1 = await this.userService.getById(username,user);
      if (user1)
    
      return user1;
    }

    @Get('matricule/:matricule')
   
    async getUserByMatricule(
      @Param('matricule') matricule: string
    ): Promise<UserEntity>{
      const user1 = await this.userService.getByMatricule(matricule);
      if (user1)
    
      return user1;
    }


    @Get('role/:role')
    @UseGuards(JwtAuthGuard)
    getUsersByRole(
         @Param('role') role: string , @User() user
        ): Promise<UserEntity[]> {
         return this.userService.getByRole(role,user);
       }


      

       @Post()
       @UseGuards(JwtAuthGuard)
       addUser(
         @Body() userData:AddUserDto , @User() user1
       ){
         return this.userService.addUser(userData, user1);
       }


    @Delete(':username')
    @UseGuards(JwtAuthGuard)
    deleteUser(
      @Param('username') username: string , @User() user
    ): Promise<unknown> {
      return this.userService.deleteUser(username,user);
    }


    @Put(':username')
    @UseGuards(JwtAuthGuard)
  updateUser(
    @Param('username') username : string,
    @Body() newUser: updateUserDto , @User() user
  ): Promise<UserEntity> {
    return this.userService.putUser(username, newUser,user);
  }
  
  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto
  ) {
    return this.userService.login(credentials);
  }
}
