/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProgrammeDto } from 'src/DTO/programme/addProgramme';
import { updateProgrammeDto } from 'src/DTO/programme/updateProgramme';
import { ProgrammeSensibilisationEntity } from 'src/entities/programme-sensibilisation.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ProgrammeService {

    constructor(
        @InjectRepository(ProgrammeSensibilisationEntity)
        private programmeRepository: Repository<ProgrammeSensibilisationEntity>
        
      )
       {}
       
       getProgrammeSensibilisation(user): Promise<ProgrammeSensibilisationEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.programmeRepository.find();
          throw new UnauthorizedException();
          
       }

      

       async getById(id:string,user): Promise<ProgrammeSensibilisationEntity>
       {
         const programme =  await this.programmeRepository.findOne(id);
         if (!programme)
           throw new NotFoundException(`Programme de sensibilisation d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return programme;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addProgrammeSensibilisation( programmeData: AddProgrammeDto, user): Promise<ProgrammeSensibilisationEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.programmeRepository.save(programmeData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putProgrammeSensibilisation(id: string, newProgramme: updateProgrammeDto , user): Promise<ProgrammeSensibilisationEntity> {
      const programme= await this.programmeRepository.findOne(id);
        id= programme.id;
      const updatedProgramme = await this.programmeRepository.preload({
            id ,
            ...newProgramme
        });

       
           console.log('Valeur de retour de preload : ', updatedProgramme);
           console.log('user : ', user.role);
        if (!programme) {
           throw new NotFoundException(`Politique d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.programmeRepository.save(updatedProgramme);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteProgrammeSensibilisation(id:string, user) {
          const programme = await this.programmeRepository.findOne({id});
         
          if (!programme) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.programmeRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restoreProgrammeSensibilisation(id: string, user) {
          const programme = await this.programmeRepository.query("select * from sensibilisation where id = ?", [id]);
          if (!programme) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.programmeRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
    

}
