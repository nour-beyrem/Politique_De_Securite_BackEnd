/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddProgrammeDto } from 'src/DTO/programme/addProgramme';
import { updateProgrammeDto } from 'src/DTO/programme/updateProgramme';
import { ProgrammeSensibilisationEntity } from 'src/entities/programme-sensibilisation.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { ProgrammeService } from './programme.service';

@Controller('programme')
export class ProgrammeController {

    
    
    constructor(private programmeService: ProgrammeService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<ProgrammeSensibilisationEntity[]> {
       return this.programmeService.getProgrammeSensibilisation(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getProgrammeSensibilisationById(
      @Param('id') id: string, @User() user
    ): Promise<ProgrammeSensibilisationEntity[]>{
      const programme = await this.programmeService.getById(id,user);

      if (programme)
         return programme;
    }

   

    @Post()
    @UseGuards(JwtAuthGuard)
    addProgrammeSensibilisation(
      @Body() programmeData:AddProgrammeDto , @User() user
    ){
      return this.programmeService.addProgrammeSensibilisation(programmeData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateProgrammeSensibilisation(
    @Param('id') id : string,
    @Body() newProgramme: updateProgrammeDto , @User() user
      ): Promise<ProgrammeSensibilisationEntity> {
      return this.programmeService.putProgrammeSensibilisation(id, newProgramme,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteProgrammeSensibilisation(
    @Param('id') id: string,
    @User() user
  ) {
    return this.programmeService.softDeleteProgrammeSensibilisation(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreProgrammeSensibilisation(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.programmeService.restoreProgrammeSensibilisation(id, user);
  }
}
