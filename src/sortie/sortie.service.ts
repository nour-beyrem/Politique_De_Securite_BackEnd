/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddSortieDto } from 'src/DTO/sortie/addSortie';
import { updateSortieDto } from 'src/DTO/sortie/updateSortie';
import { SortieActifEntity } from 'src/entities/sortie-actif.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class SortieService {

    constructor(
        @InjectRepository(SortieActifEntity)
        private sortieRepository: Repository<SortieActifEntity>
        
      )
       {}
       
       getSortieActif(user): Promise<SortieActifEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.sortieRepository.find();
          throw new UnauthorizedException();
          
       }

       async getSortieActifbyuser(agentS,user): Promise<SortieActifEntity[]>
       {
          if (user.role === UserRoleEnum.ResponsableSecurite || user.username === agentS )
            return await this.sortieRepository.find({agentS})
          throw new UnauthorizedException();
        
         
      }


       async getById(ref:string,user): Promise<SortieActifEntity[]>
       {
         const sortie =  await this.sortieRepository.find({ref});
         if (!sortie)
           throw new NotFoundException(`Sortie Actif d'id ${ref} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return sortie;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addSortieActif( sortieData: AddSortieDto, user): Promise<SortieActifEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  ||user.role === UserRoleEnum.AGENT)
          return await this.sortieRepository.save(sortieData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putSortieActif(ref: string, newSortieActif: updateSortieDto , user): Promise<SortieActifEntity> {
      const sortie= await this.sortieRepository.findOne(ref);
        ref= sortie.ref;
      const updatedSortieActif = await this.sortieRepository.preload({
            ref ,
            ...newSortieActif
        });

       
           console.log('Valeur de retour de preload : ', updatedSortieActif);
           console.log('user : ', user.role);
        if (!sortie) {
           throw new NotFoundException(`Sortie Actif d'id ${ref} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite || user.username=== sortie.agentS.username)    
          return await this.sortieRepository.save(updatedSortieActif);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteSortieActif(ref:string, user) {
          const sortie = await this.sortieRepository.findOne({ref});
         
          if (!sortie) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.sortieRepository.softDelete(ref);
          else
            throw new UnauthorizedException('');
        }


        async restoreSortieActif(ref: string, user) {
          const sortie = await this.sortieRepository.query("select * from sortie where ref = ?", [ref]);
          if (!sortie) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.sortieRepository.restore(ref);
          else
            throw new UnauthorizedException('');
        }
}
