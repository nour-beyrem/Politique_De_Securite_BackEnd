/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddActifDto } from 'src/DTO/actif/addActif';
import { updateActifDto } from 'src/DTO/actif/updateActif';
import { ActifEntity } from 'src/entities/actif.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ActifService {

    constructor(
        @InjectRepository(ActifEntity)
        private actifRepository: Repository<ActifEntity>
        
      )
       {}
       
       getActif(user): Promise<ActifEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.actifRepository.find();
          throw new UnauthorizedException();
          
       }

       async getActifbyuser(proprietaire,user): Promise<ActifEntity[]>
       {
         if (user.role === UserRoleEnum.ResponsableSecurite )
           return await this.actifRepository.find({proprietaire})
         throw new UnauthorizedException();
         
      }
      async getActifbyRef(reference,user): Promise<ActifEntity[]>
      {
        if (user.role === UserRoleEnum.ResponsableSecurite )
          return await this.actifRepository.find({reference})
        throw new UnauthorizedException();
        
     }

       async getById(id:string,user): Promise<ActifEntity>
       {
         const actif =  await this.actifRepository.findOne(id);
         if (!actif)
           throw new NotFoundException(`Actif d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return actif;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addActif( actifData: AddActifDto, user): Promise<ActifEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.actifRepository.save(actifData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putActif(id: string, newActif: updateActifDto , user): Promise<ActifEntity> {
      const actif= await this.actifRepository.findOne(id);
        id= actif.id;
      const updatedActif = await this.actifRepository.preload({
            id ,
            ...newActif
        });

       
           console.log('Valeur de retour de preload : ', updatedActif);
           console.log('user : ', user.role);
        if (!actif) {
           throw new NotFoundException(`Actif d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.actifRepository.save(updatedActif);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteActif(id:string, user) {
          const actif = await this.actifRepository.findOne({id});
         
          if (!actif) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.actifRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restoreActif(id: string, user) {
          const actif = await this.actifRepository.query("select * from actif where id = ?", [id]);
          if (!actif) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.actifRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
