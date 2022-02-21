/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddPerimetreDto } from 'src/DTO/perimetre/addPerimetre';
import { updatePerimetreDto } from 'src/DTO/perimetre/updatePerimetre';
import { PerimetreEntity } from 'src/entities/perimetre.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class PerimetreService {
    constructor(
        @InjectRepository(PerimetreEntity)
        private perimetreRepository: Repository<PerimetreEntity>
        
      )
       {}
       
       getPerimetre(user): Promise<PerimetreEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.perimetreRepository.find();
          throw new UnauthorizedException();
          
       }


       async getById(id:string,user): Promise<PerimetreEntity>
       {
         const perimetre =  await this.perimetreRepository.findOne(id);
         if (!perimetre)
           throw new NotFoundException(`Perimetre d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return perimetre;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addPerimetre( perimetreData: AddPerimetreDto, user): Promise<PerimetreEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.perimetreRepository.save(perimetreData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putPerimetre(id: string, newPerimetre: updatePerimetreDto , user): Promise<PerimetreEntity> {
      const perimetre= await this.perimetreRepository.findOne(id);
        id= perimetre.id;
      const updatedPerimetre = await this.perimetreRepository.preload({
            id ,
            ...newPerimetre
        });

       
           console.log('Valeur de retour de preload : ', updatedPerimetre);
           console.log('user : ', user.role);
        if (!perimetre) {
           throw new NotFoundException(`Perimetre d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.perimetreRepository.save(updatedPerimetre);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeletePerimetre(id:string, user) {
          const perimetre = await this.perimetreRepository.findOne({id});
         
          if (!perimetre) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.perimetreRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restorePerimetre(id: string, user) {
          const perimetre = await this.perimetreRepository.query("select * from perimetre where id = ?", [id]);
          if (!perimetre) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.perimetreRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
