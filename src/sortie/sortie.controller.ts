/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddSortieDto } from 'src/DTO/sortie/addSortie';
import { updateSortieDto } from 'src/DTO/sortie/updateSortie';
import { SortieActifEntity } from 'src/entities/sortie-actif.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { SortieService } from './sortie.service';

@Controller('sortie')
export class SortieController {

    constructor(private sortieService: SortieService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<SortieActifEntity[]> {
       return this.sortieService.getSortieActif(user);
    }

 



    @Get(':ref')
    @UseGuards(JwtAuthGuard)
    async getSortieById(
      @Param('ref') id: string, @User() user
    ): Promise<SortieActifEntity[]>{
      const sortie = await this.sortieService.getById(id,user);

      if (sortie)
         return sortie;
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    addSortie(
      @Body() sortieData:AddSortieDto , @User() user
    ){
      return this.sortieService.addSortieActif(sortieData, user);
    }

    @Get('agent/:agentS')
    @UseGuards(JwtAuthGuard)
    getSortiebyagent(
         @Param('agentS') agentS: string , @User() user
        ): Promise<SortieActifEntity[]> {
         return this.sortieService.getSortieActifbyuser(agentS,user);
       }

    @Put(':ref')
    @UseGuards(JwtAuthGuard)
    updatePerimetre(
    @Param('ref') ref : string,
    @Body() newSortie: updateSortieDto , @User() user
      ): Promise<SortieActifEntity> {
      return this.sortieService.putSortieActif(ref, newSortie,user);
    }


    @Delete(':ref')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteSortie(
    @Param('ref') ref: string,
    @User() user
  ) {
    return this.sortieService.softDeleteSortieActif(ref, user);
  }

  @Get('recover/:ref')
  @UseGuards(JwtAuthGuard)
  async restoreSortie(
    @Param('ref') ref: string,
    @User() user
  ) {
    return await this.sortieService.restoreSortieActif(ref, user);
  }
}
