/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddActifDto } from 'src/DTO/actif/addActif';
import { updateActifDto } from 'src/DTO/actif/updateActif';
import { ActifEntity } from 'src/entities/actif.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { ActifService } from './actif.service';

@Controller('actif')
export class ActifController {

    constructor(private actifService: ActifService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<ActifEntity[]> {
       return this.actifService.getActif(user);
    }

 

    @Get('proprietaire/:proprietaire')
    @UseGuards(JwtAuthGuard)
    getActifByUser(
         @Param('proprietaire') proprietaire: string , @User() user
        ): Promise<ActifEntity[]> {
         return this.actifService.getActifbyuser(proprietaire,user);
       }

       @Get('reference/:reference')
       @UseGuards(JwtAuthGuard)
       getActifByRef(
            @Param('reference') reference: string , @User() user
           ): Promise<ActifEntity[]> {
            return this.actifService.getActifbyuser(reference,user);
          }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getActifById(
      @Param('id') id: string, @User() user
    ): Promise<ActifEntity>{
      const actif = await this.actifService.getById(id,user);

      if (actif)
         return actif;
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    addActif(
      @Body() actifData:AddActifDto , @User() user
    ){
      return this.actifService.addActif(actifData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateActif(
    @Param('id') id : string,
    @Body() newActif: updateActifDto , @User() user
      ): Promise<ActifEntity> {
      return this.actifService.putActif(id, newActif,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteActif(
    @Param('id') id: string,
    @User() user
  ) {
    return this.actifService.softDeleteActif(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreActif(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.actifService.restoreActif(id, user);
  }
}
