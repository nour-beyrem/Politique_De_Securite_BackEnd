/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddAutorisationDto } from 'src/DTO/autorisation/addAutorisation';
import { updateAutorisationDto } from 'src/DTO/autorisation/updateAutorisation';
import { DemandeAutorisationEntity } from 'src/entities/demande-autorisation.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { AutorisationService } from './autorisation.service';

@Controller('autorisation')
export class AutorisationController {

    constructor(private autorisationService: AutorisationService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<DemandeAutorisationEntity[]> {
       return this.autorisationService.getAutorisation(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getAutorisationById(
      @Param('id') id: string, @User() user
    ): Promise<DemandeAutorisationEntity>{
      const autorisation = await this.autorisationService.getById(id,user);

      if (autorisation)
         return autorisation;
    }

    @Get('user/:user')
    @UseGuards(JwtAuthGuard)
    getAutorisationByUser(
         @Param('user') user: string , @User() user1
        ): Promise<DemandeAutorisationEntity[]> {
         return this.autorisationService.getAutorisationbyuser(user,user1);
       }

    @Post()
    @UseGuards(JwtAuthGuard)
    addAutorisation(
      @Body() autorisationData:AddAutorisationDto , @User() user
    ){
      return this.autorisationService.addAutorisation(autorisationData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateAutorisation(
    @Param('id') id : string,
    @Body() newAutorisation: updateAutorisationDto , @User() user
      ): Promise<DemandeAutorisationEntity> {
      return this.autorisationService.putAutorisation(id, newAutorisation,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteAutorisation(
    @Param('id') id: string,
    @User() user
  ) {
    return this.autorisationService.softDeleteAutorisation(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreAutorisation(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.autorisationService.restoreAutorisation(id, user);
  }
}
