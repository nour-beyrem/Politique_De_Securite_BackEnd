/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddDocumentDto } from 'src/DTO/document/addDocument';
import { updateDocumentDto } from 'src/DTO/document/updateDocument';
import { PolitiqueEntity } from 'src/entities/politique.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentService {

    constructor(
        @InjectRepository(PolitiqueEntity)
        private politiqueRepository: Repository<PolitiqueEntity>
        
      )
       {}
       
       getPolitique(user): Promise<PolitiqueEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.politiqueRepository.find();
          throw new UnauthorizedException();
          
       }

       async getPolitiquebyqui(qui): Promise<PolitiqueEntity[]>
       {
        
           return await this.politiqueRepository.find({qui})
        
         
      }

      async getPolitiquebyType(typeChapitre): Promise<PolitiqueEntity>
      {
       
          return await this.politiqueRepository.findOne({typeChapitre})
       
        
     }

       async getById(id:string,user): Promise<PolitiqueEntity>
       {
         const politique =  await this.politiqueRepository.findOne(id);
         if (!politique)
           throw new NotFoundException(`Politique d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return politique;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addPolitique( politiqueData: AddDocumentDto, user): Promise<PolitiqueEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.politiqueRepository.save(politiqueData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putPolitique(id: string, newPolitique: updateDocumentDto , user): Promise<PolitiqueEntity> {
      const politique= await this.politiqueRepository.findOne(id);
        id= politique.id;
      const updatedPolitique = await this.politiqueRepository.preload({
            id ,
            ...newPolitique
        });

       
           console.log('Valeur de retour de preload : ', updatedPolitique);
           console.log('user : ', user.role);
        if (!politique) {
           throw new NotFoundException(`Politique d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.politiqueRepository.save(updatedPolitique);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeletePolitique(id:string, user) {
          const politique = await this.politiqueRepository.findOne({id});
         
          if (!politique) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.politiqueRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restorePolitique(id: string, user) {
          const politique = await this.politiqueRepository.query("select * from politique where id = ?", [id]);
          if (!politique) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.politiqueRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
