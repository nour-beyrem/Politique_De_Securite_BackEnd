/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddPerimetreDto } from 'src/DTO/perimetre/addPerimetre';
import { updatePerimetreDto } from 'src/DTO/perimetre/updatePerimetre';
import { PerimetreEntity } from 'src/entities/perimetre.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { PerimetreService } from './perimetre.service';

@Controller('perimetre')
export class PerimetreController {

    constructor(private perimetreService: PerimetreService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<PerimetreEntity[]> {
       return this.perimetreService.getPerimetre(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getPerimetreById(
      @Param('id') id: string, @User() user
    ): Promise<PerimetreEntity[]>{
      const perimetre = await this.perimetreService.getById(id,user);

      if (perimetre)
         return perimetre;
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    addPerimetre(
      @Body() perimetreData:AddPerimetreDto , @User() user
    ){
      return this.perimetreService.addPerimetre(perimetreData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updatePerimetre(
    @Param('id') id : string,
    @Body() newPerimetre: updatePerimetreDto , @User() user
      ): Promise<PerimetreEntity> {
      return this.perimetreService.putPerimetre(id, newPerimetre,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeletePerimetre(
    @Param('id') id: string,
    @User() user
  ) {
    return this.perimetreService.softDeletePerimetre(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restorePerimetre(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.perimetreService.restorePerimetre(id, user);
  }
}
