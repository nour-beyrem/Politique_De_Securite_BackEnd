/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddReunionDto } from 'src/DTO/reunion/addReunion';
import { updateReunionDto } from 'src/DTO/reunion/updateReunion';
import { ReunionEntity } from 'src/entities/reunion.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { ReunionService } from './reunion.service';

@Controller('reunion')
export class ReunionController {
    constructor(private reunionService: ReunionService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<ReunionEntity[]> {
       return this.reunionService.getReunion(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getReunionById(
      @Param('id') id: string, @User() user
    ): Promise<ReunionEntity>{
      const reunion = await this.reunionService.getById(id,user);

      if (reunion)
         return reunion;
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    addReunion(
      @Body() reunionData:AddReunionDto , @User() user
    ){
      return this.reunionService.addReunion(reunionData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateReunion(
    @Param('id') id : string,
    @Body() newReunion: updateReunionDto , @User() user
      ): Promise<ReunionEntity> {
      return this.reunionService.putReunion(id, newReunion,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteReunion(
    @Param('id') id: string,
    @User() user
  ) {
    return this.reunionService.softDeleteReunion(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreReunion(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.reunionService.restoreReunion(id, user);
  }
}
