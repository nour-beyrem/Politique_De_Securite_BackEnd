/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddInformationDto } from 'src/DTO/information/addInformation';
import { updateInformationDto } from 'src/DTO/information/updateInformation';
import { InformationEntity } from 'src/entities/information.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class InformationService {

    constructor(
        @InjectRepository(InformationEntity)
        private informationRepository: Repository<InformationEntity>
        
      )
       {}
       
       getInformation(user): Promise<InformationEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.informationRepository.find();
          throw new UnauthorizedException();
          
       }


       async getById(id:string,user): Promise<InformationEntity>
       {
         const information =  await this.informationRepository.findOne(id);
         if (!information)
           throw new NotFoundException(`Information d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return information;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addInformation( informationData: AddInformationDto, user): Promise<InformationEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.informationRepository.save(informationData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putInformation(id: string, newInformation: updateInformationDto , user): Promise<InformationEntity> {
      const information= await this.informationRepository.findOne(id);
        id= information.id;
      const updatedInformation = await this.informationRepository.preload({
            id ,
            ...newInformation
        });

        //console.log('Valeur de retour de preload : ', medicament);
           console.log('Valeur de retour de preload : ', updatedInformation);
           console.log('user : ', user.role);
        if (!information) {
           throw new NotFoundException(`Information d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.informationRepository.save(updatedInformation);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteInformation(id:string, user) {
          const information = await this.informationRepository.findOne({id});
         
          if (!information) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.informationRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restoreInformation(id: string, user) {
          const information = await this.informationRepository.query("select * from information where id = ?", [id]);
          if (!information) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.informationRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
