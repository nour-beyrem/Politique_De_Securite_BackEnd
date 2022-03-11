/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddIncidentDto } from 'src/DTO/incident/addIncident';
import { updateIncidentDto } from 'src/DTO/incident/updateIncident';
import { IncidentEntity } from 'src/entities/incident.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class IncidentService {

    constructor(
        @InjectRepository(IncidentEntity)
        private incidentRepository: Repository<IncidentEntity>
        
      )
       {}
       
       getIncident(user): Promise<IncidentEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.incidentRepository.find();
          throw new UnauthorizedException();
          
       }


       async getById(id:string,user): Promise<IncidentEntity[]>
       {
         const incident =  await this.incidentRepository.find({id});
         if (!incident)
           throw new NotFoundException(`Incident d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return incident;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addIncident( incidentData: AddIncidentDto, user): Promise<IncidentEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.incidentRepository.save(incidentData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putIncident(id: string, newIncident: updateIncidentDto , user): Promise<IncidentEntity> {
      const incident= await this.incidentRepository.findOne(id);
        id= incident.id;
      const updatedIncident = await this.incidentRepository.preload({
            id ,
            ...newIncident
        });

       
           console.log('Valeur de retour de preload : ', updatedIncident);
           console.log('user : ', user.role);
        if (!incident) {
           throw new NotFoundException(`Incident d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.incidentRepository.save(updatedIncident);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteIncident(id:string, user) {
          const incident = await this.incidentRepository.findOne({id});
         
          if (!incident) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.incidentRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restoreIncident(id: string, user) {
          const incident = await this.incidentRepository.query("select * from incident where id = ?", [id]);
          if (!incident) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.incidentRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
