/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCelluleDto } from 'src/DTO/cellule/addCellule';
import { updateCelluleDto } from 'src/DTO/cellule/updateCellule';
import { CelluleEntity } from 'src/entities/cellule.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class CelluleService {

    constructor(
        @InjectRepository(CelluleEntity)
        private celluleRepository: Repository<CelluleEntity>
        
      )
       {}
       
       getCellule(user): Promise<CelluleEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.celluleRepository.find();
          throw new UnauthorizedException();
          
       }


       async getById(id:string,user): Promise<CelluleEntity[]>
       {
         const cellule =  await this.celluleRepository.find({id});
         if (!cellule)
           throw new NotFoundException(`cellule d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return cellule;
         else
           throw new UnauthorizedException();
       }
       
       async getCelluleByRef(reference:string,user1): Promise<CelluleEntity[]>
       {
         if (user1.role === UserRoleEnum.ResponsableSecurite )
           return await this.celluleRepository.find({reference})
         throw new UnauthorizedException();
         
      }
      
          
       async addCellule( celluleData: AddCelluleDto, user): Promise<CelluleEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.celluleRepository.save(celluleData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putCellule(id: string, newCellule: updateCelluleDto , user): Promise<CelluleEntity> {
      const cellule= await this.celluleRepository.findOne(id);
        id= cellule.id;
      const updatedCellule = await this.celluleRepository.preload({
            id ,
            ...newCellule
        });

        //console.log('Valeur de retour de preload : ', medicament);
           console.log('Valeur de retour de preload : ', updatedCellule);
           console.log('user : ', user.role);
        if (!cellule) {
           throw new NotFoundException(`La cellule d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.celluleRepository.save(updatedCellule);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteCellule(id:string, user) {
          const cellule = await this.celluleRepository.findOne({id});
         
          if (!cellule) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.celluleRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restoreCellule(id: string, user) {
          const cellule = await this.celluleRepository.query("select * from cellule where id = ?", [id]);
          if (!cellule) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.celluleRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
