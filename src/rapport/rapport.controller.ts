/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddRapportDto } from 'src/DTO/rapport/addRapport';
import { updateRapportDto } from 'src/DTO/rapport/updateRapport';
import { RapportEntity } from 'src/entities/rapport.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { RapportService } from './rapport.service';

@Controller('rapport')
export class RapportController {

    constructor(private rapportService: RapportService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<RapportEntity[]> {
       return this.rapportService.getRapport(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getRapportById(
      @Param('id') id: string, @User() user
    ): Promise<RapportEntity>{
      const rapport = await this.rapportService.getById(id,user);

      if (rapport)
         return rapport;
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    addRapport(
      @Body() rapportData:AddRapportDto , @User() user
    ){
      return this.rapportService.addRapport(rapportData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateRapport(
    @Param('id') id : string,
    @Body() newRapport: updateRapportDto , @User() user
      ): Promise<RapportEntity> {
      return this.rapportService.putRapport(id, newRapport,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteRapport(
    @Param('id') id: string,
    @User() user
  ) {
    return this.rapportService.softDeleteRapport(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreRapport(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.rapportService.restoreRapport(id, user);
  }
}
