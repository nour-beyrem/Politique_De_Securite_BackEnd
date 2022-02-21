/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddReunionDto } from 'src/DTO/reunion/addReunion';
import { updateReunionDto } from 'src/DTO/reunion/updateReunion';
import { ReunionEntity } from 'src/entities/reunion.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ReunionService {

    
    constructor(
        @InjectRepository(ReunionEntity)
        private reunionRepository: Repository<ReunionEntity>
        
      )
       {}
       
       getReunion(user): Promise<ReunionEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.reunionRepository.find();
          throw new UnauthorizedException();
          
       }


       async getById(id:string,user): Promise<ReunionEntity>
       {
         const reunion =  await this.reunionRepository.findOne(id);
         if (!reunion)
           throw new NotFoundException(`Reunion d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return reunion;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addReunion( reunionData: AddReunionDto, user): Promise<ReunionEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.reunionRepository.save(reunionData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putReunion(id: string, newReunion: updateReunionDto , user): Promise<ReunionEntity> {
      const reunion= await this.reunionRepository.findOne(id);
        id= reunion.id;
      const updatedReunion = await this.reunionRepository.preload({
            id ,
            ...newReunion
        });

        //console.log('Valeur de retour de preload : ', medicament);
           console.log('Valeur de retour de preload : ', updatedReunion);
           console.log('user : ', user.role);
        if (!reunion) {
           throw new NotFoundException(`Reunion d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.reunionRepository.save(updatedReunion);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteReunion(id:string, user) {
          const reunion = await this.reunionRepository.findOne({id});
         
          if (!reunion) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.reunionRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restoreReunion(id: string, user) {
          const reunion = await this.reunionRepository.query("select * from reunion where id = ?", [id]);
          if (!reunion) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.reunionRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
