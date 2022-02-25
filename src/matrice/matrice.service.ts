/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddMatriceDto } from 'src/DTO/matrice/addMatrice';
import { updateMatriceDto } from 'src/DTO/matrice/updateMatrice';
import { MatriceFluxEntity } from 'src/entities/matrice-flux.entity';
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class MatriceService {

    constructor(
        @InjectRepository(MatriceFluxEntity)
        private matriceRepository: Repository<MatriceFluxEntity>
        
      )
       {}
       
       getMatriceFlux(user): Promise<MatriceFluxEntity[]>
        {
          if (user.role === UserRoleEnum.ResponsableSecurite  )
            return this.matriceRepository.find();
          throw new UnauthorizedException();
          
       }

   


       async getById(id:string,user): Promise<MatriceFluxEntity>
       {
         const matrice =  await this.matriceRepository.findOne(id);
         if (!matrice)
           throw new NotFoundException(`matrice d'id ${id} n'existe pas`);
         if (user.role === UserRoleEnum.ResponsableSecurite )
            return matrice;
         else
           throw new UnauthorizedException();
       }
       
      
          
       async addMatriceFlux( matriceData: AddMatriceDto, user): Promise<MatriceFluxEntity> {
         
        if (user.role === UserRoleEnum.ResponsableSecurite  )
          return await this.matriceRepository.save(matriceData);
        throw new UnauthorizedException();
        
      
         }
       
       
           
           
    async putMatriceFlux(id: string, newMatrice: updateMatriceDto , user): Promise<MatriceFluxEntity> {
      const matrice= await this.matriceRepository.findOne(id);
        id= matrice.id;
      const updatedMatrice = await this.matriceRepository.preload({
            id ,
            ...newMatrice
        });

       
           console.log('Valeur de retour de preload : ', updatedMatrice);
           console.log('user : ', user.role);
        if (!matrice) {
           throw new NotFoundException(`Matrice d'id ${id} n'existe pas`);
        }
        if (user.role === UserRoleEnum.ResponsableSecurite )    
          return await this.matriceRepository.save(updatedMatrice);
             
           
        throw new UnauthorizedException();
    
         }


         



         async softDeleteMatriceFlux(id:string, user) {
          const matrice = await this.matriceRepository.findOne({id});
         
          if (!matrice) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite )
            return this.matriceRepository.softDelete(id);
          else
            throw new UnauthorizedException('');
        }


        async restoreMatriceFlux(id: string, user) {
          const matrice = await this.matriceRepository.query("select * from fluxmatrice where id = ?", [id]);
          if (!matrice) {
            throw new NotFoundException('');
          }
          if (user.role === UserRoleEnum.ResponsableSecurite)
            return this.matriceRepository.restore(id);
          else
            throw new UnauthorizedException('');
        }
}
