/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddCelluleDto } from 'src/DTO/cellule/addCellule';
import { updateCelluleDto } from 'src/DTO/cellule/updateCellule';
import { CelluleEntity } from 'src/entities/cellule.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { CelluleService } from './cellule.service';

@Controller('cellule')
export class CelluleController {

    constructor(private celluleService: CelluleService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<CelluleEntity[]> {
       return this.celluleService.getCellule(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getCelluleById(
      @Param('id') id: string, @User() user
    ): Promise<CelluleEntity[]>{
      const cellule = await this.celluleService.getById(id,user);

      if (cellule)
         return cellule;
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    addCellule(
      @Body() celluleData:AddCelluleDto , @User() user
    ){
      return this.celluleService.addCellule(celluleData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateCellule(
    @Param('id') id : string,
    @Body() newCellule: updateCelluleDto , @User() user
      ): Promise<CelluleEntity> {
      return this.celluleService.putCellule(id, newCellule,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteCellule(
    @Param('id') id: string,
    @User() user
  ) {
    return this.celluleService.softDeleteCellule(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreCellule(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.celluleService.restoreCellule(id, user);
  }


}
