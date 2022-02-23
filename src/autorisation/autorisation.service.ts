/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddAutorisationDto } from 'src/DTO/autorisation/addAutorisation';
import { updateAutorisationDto } from 'src/DTO/autorisation/updateAutorisation';
import { DemandeAutorisationEntity } from 'src/entities/demande-autorisation.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class AutorisationService {

    constructor(
        @InjectRepository(DemandeAutorisationEntity)
        private autorisationRepository: Repository<DemandeAutorisationEntity>
        
      )
       {}
       
       getAutorisation(user): Promise<DemandeAutorisationEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.autorisationRepository.find();
          throw new UnauthorizedException();
          
       }

       async getAutorisationbyuser(user,user1): Promise<DemandeAutorisationEntity[]>
       {
         if (user1.role === UserRoleEnum.ResponsableSecurite || user1.username=== user )
           return await this.autorisationRepository.find({user})
         throw new UnauthorizedException();
         
      }


       async getById(id:string,user): Promise<DemandeAutorisationEntity>
       {
         const autorisation =  await this.autorisationRepository.findOne(id);
         if (!autorisation)
           throw new NotFoundException(`Autorisation d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return autorisation;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addAutorisation( autorisationData: AddAutorisationDto, user): Promise<DemandeAutorisationEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.autorisationRepository.save(autorisationData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putAutorisation(id: string, newAutorisation: updateAutorisationDto , user): Promise<DemandeAutorisationEntity> {
      const autorisation= await this.autorisationRepository.findOne(id);
        id= autorisation.id;
      const updatedAutorisation = await this.autorisationRepository.preload({
            id ,
            ...newAutorisation
        });

       
           console.log('Valeur de retour de preload : ', updatedAutorisation);
           console.log('user : ', user.role);
        if (!autorisation) {
           throw new NotFoundException(`autorisation d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.autorisationRepository.save(updatedAutorisation);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteAutorisation(id:string, user) {
          const autorisation = await this.autorisationRepository.findOne({id});
         
          if (!autorisation) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.autorisationRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restoreAutorisation(id: string, user) {
          const autorisation = await this.autorisationRepository.query("select * from autorisation where id = ?", [id]);
          if (!autorisation) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.autorisationRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
