/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from 'src/DTO/user/addUser';
import { LoginCredentialsDto } from 'src/DTO/user/loginUser';
import { updateUserDto } from 'src/DTO/user/updateUser';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRoleEnum } from './enum/user-role.enum';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
        
      )
       {}



       async getUsers(user): Promise<UserEntity[]>
       {
        if (user.role === UserRoleEnum.ResponsableSecurite )
            return await this.userRepository.find();
        else 
            throw new UnauthorizedException();
         
       }
   
   
       async getById(username:string, user): Promise<UserEntity>
       {
         const personnel =  await this.userRepository.findOne(username);
         
   
         if (!personnel)
           { 
             throw new NotFoundException(`user d'id ${username} n'existe pas`);
           }
           
         if (user.role === UserRoleEnum.AGENT || personnel.username === user.username)
            return personnel;
   
         else 
         throw new UnauthorizedException();
         
       }
   
    
       async getByMatricule(matricule:string): Promise<UserEntity>
       {
         const personnel =  await this.userRepository.findOne(matricule);
         
   
         if (!personnel)
           { 
             throw new NotFoundException(`user de matricule ${matricule} n'existe pas`);
           }
         else 
         return personnel;
         
       }

       
       async getByRole(role:string,user): Promise<UserEntity[]>
       {
            
        if (user.role === UserRoleEnum.ResponsableSecurite )
           return await this.userRepository.find({role});
   
        else 
           throw new UnauthorizedException();
       }
   
     
       async addUser(userData: AddUserDto, user1) : Promise<Partial<UserEntity>>{
   
        if (user1.role === UserRoleEnum.ResponsableSecurite ) {
           const user = this.userRepository.create({
             ...userData
           });
           user.salt = await bcrypt.genSalt();
           user.password = await bcrypt.hash(user.password, user.salt);
           try {
             await this.userRepository.save(user);
           } catch (e) {
             throw new ConflictException(`le email ou le username doit être unique`);
           }
           return {
             username: user.username,
             email: user.email,
             role: user.role
           };
         }
   
        else 
         throw new UnauthorizedException();
         
         
         
   
         
         
         
         
         
         
         
         
         
         
         
         
         
       }
   

   
        
         
         
         
   
         
         
         
         
         
         
     
   
     async deleteUser(username: string, user): Promise<unknown> {
   
       if (user.role === UserRoleEnum.ResponsableSecurite){
         const deletedUser = await this.userRepository.delete(username);
         if(! deletedUser) {
           throw new NotFoundException(`user d'id ${username} n'existe pas`);
         } else {
           return deletedUser;
         }
       }
       else 
         throw new UnauthorizedException();
          
       
     }
       
       
     async putUser(username: string, newUser: updateUserDto, user): Promise<UserEntity> {
       const updatedUser = await this.userRepository.preload({
         username,
         ...newUser
     });
       console.log('Valeur de retour de preload : ', updatedUser);
     if (! updatedUser) {
       throw new NotFoundException(`user d'id ${username} n'existe pas`);
     } 
     if (user.role === UserRoleEnum.ResponsableSecurite || updatedUser.username === user.username){
       return await this.userRepository.save(updatedUser);
     }
     else 
       throw new UnauthorizedException();
        
     
     }
   
   
   
   
     async login(credentials: LoginCredentialsDto)  {
   
       
       const {username, password} = credentials;
       const user = await this.userRepository.createQueryBuilder("user")
         .where("user.username = :username or user.email = :username",
           {username}
           )
         .getOne(); 
       if (!user)
         throw new NotFoundException('username ou password erronée');
      
       const hashedPassword = await bcrypt.hash(password, user.salt);
       if (hashedPassword === user.password) {
         const payload = {
           username: user.username,
           email: user.email,
           role: user.role,
           matricule: user.matricule
         };
         const jwt = await this.jwtService.sign(payload);
         
         return {
           "access_token" : jwt,
           "user": user
         };
       } else {
         
         throw new NotFoundException('username ou password erronée');
       }
     }
   
   
       
       
       
     
       
       
       
     
     
     
   
   
   
       
       
       
     
       
       
       
     
     
     
     
     
     
     
     
     
     
     
     
     
     
   
     
     
     
   
     

}
