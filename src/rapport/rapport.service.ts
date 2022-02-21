/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddRapportDto } from 'src/DTO/rapport/addRapport';
import { updateRapportDto } from 'src/DTO/rapport/updateRapport';
import { RapportEntity } from 'src/entities/rapport.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RapportService {
    constructor(
        @InjectRepository(RapportEntity)
        private rapportRepository: Repository<RapportEntity>
        
      )
       {}
       
       getRapport(user): Promise<RapportEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.rapportRepository.find();
          throw new UnauthorizedException();
          
       }


       async getById(id:string,user): Promise<RapportEntity>
       {
         const rapport =  await this.rapportRepository.findOne(id);
         if (!rapport)
           throw new NotFoundException(`Rapport d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return rapport;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addRapport( rapportData: AddRapportDto, user): Promise<RapportEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.rapportRepository.save(rapportData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putRapport(id: string, newRapport: updateRapportDto , user): Promise<RapportEntity> {
      const rapport= await this.rapportRepository.findOne(id);
        id= rapport.id;
      const updatedRapport = await this.rapportRepository.preload({
            id ,
            ...newRapport
        });

        //console.log('Valeur de retour de preload : ', medicament);
           console.log('Valeur de retour de preload : ', updatedRapport);
           console.log('user : ', user.role);
        if (!rapport) {
           throw new NotFoundException(`Rapport d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.rapportRepository.save(updatedRapport);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteRapport(id:string, user) {
          const rapport = await this.rapportRepository.findOne({id});
         
          if (!rapport) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.rapportRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restoreRapport(id: string, user) {
          const rapport = await this.rapportRepository.query("select * from rapport where id = ?", [id]);
          if (!rapport) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.rapportRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
