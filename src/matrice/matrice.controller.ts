/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddMatriceDto } from 'src/DTO/matrice/addMatrice';
import { updateMatriceDto } from 'src/DTO/matrice/updateMatrice';
import { MatriceFluxEntity } from 'src/entities/matrice-flux.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { MatriceService } from './matrice.service';

@Controller('matrice')
export class MatriceController {

    constructor(private matriceService: MatriceService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<MatriceFluxEntity[]> {
       return this.matriceService.getMatriceFlux(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getMatriceById(
      @Param('id') id: string, @User() user
    ): Promise<MatriceFluxEntity[]>{
      const matrice = await this.matriceService.getById(id,user);

      if (matrice)
         return matrice;
    }

    
    @Get('ref/:ref')
    @UseGuards(JwtAuthGuard)
    getMatriceByRef(
         @Param('ref') ref: string , @User() user
        ): Promise<MatriceFluxEntity[]> {
         return this.matriceService.getByRef(ref,user);
       }

       
    @Post()
    @UseGuards(JwtAuthGuard)
    addMatrice(
      @Body() matriceData:AddMatriceDto , @User() user
    ){
      return this.matriceService.addMatriceFlux(matriceData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateMatrice(
    @Param('id') id : string,
    @Body() newMatrice: updateMatriceDto , @User() user
      ): Promise<MatriceFluxEntity> {
      return this.matriceService.putMatriceFlux(id, newMatrice,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteMatrice(
    @Param('id') id: string,
    @User() user
  ) {
    return this.matriceService.softDeleteMatriceFlux(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreMatrice(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.matriceService.restoreMatriceFlux(id, user);
  }
}
