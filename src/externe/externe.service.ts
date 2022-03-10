/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddExterneDto } from 'src/DTO/externe/addExterne';
import { updateExterneDto } from 'src/DTO/externe/updateExterne';
import { ExterneEntity } from 'src/entities/externe.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ExterneService {
    constructor(
        @InjectRepository(ExterneEntity)
        private externeRepository: Repository<ExterneEntity>
        
      )
       {}
       
       getExterne(user): Promise<ExterneEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.externeRepository.find();
          throw new UnauthorizedException();
          
       }

       


       async getById(id:string,user): Promise<ExterneEntity>
       {
         const externe =  await this.externeRepository.findOne(id);
         if (!externe)
           throw new NotFoundException(`Externe d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return externe;
         else
           throw new UnauthorizedException();
       }
       
       async getByType(type:string,user): Promise<ExterneEntity[]>
       {
            
        if (user.role === UserRoleEnum.ResponsableSecurite )
           return await this.externeRepository.find({type});
   
        else 
           throw new UnauthorizedException();
       }
      
          
       async addExterne( externeData: AddExterneDto): Promise<ExterneEntity> {
         
       
          return await this.externeRepository.save(externeData);
        
        
      
         }
       
       
           
           
    async putExterne(id: string, newExterne: updateExterneDto , user): Promise<ExterneEntity> {
      const externe= await this.externeRepository.findOne(id);
        id= externe.id;
      const updatedExterne = await this.externeRepository.preload({
            id ,
            ...newExterne
        });

       
           console.log('Valeur de retour de preload : ', updatedExterne);
           console.log('user : ', user.role);
        if (!externe) {
           throw new NotFoundException(`Externe d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.externeRepository.save(updatedExterne);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteExterne(id:string, user) {
          const externe = await this.externeRepository.findOne({id});
         
          if (!externe) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.externeRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restoreExterne(id: string, user) {
          const externe = await this.externeRepository.query("select * from externe where id = ?", [id]);
          if (!externe) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.externeRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
