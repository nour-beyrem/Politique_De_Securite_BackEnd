/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddInformationDto } from 'src/DTO/information/addInformation';
import { updateInformationDto } from 'src/DTO/information/updateInformation';
import { InformationEntity } from 'src/entities/information.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { InformationService } from './information.service';

@Controller('information')
export class InformationController {

    constructor(private informationService: InformationService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<InformationEntity[]> {
       return this.informationService.getInformation(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getInformationById(
      @Param('id') id: string, @User() user
    ): Promise<InformationEntity>{
      const information = await this.informationService.getById(id,user);

      if (information)
         return information;
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    addInformation(
      @Body() informationData:AddInformationDto , @User() user
    ){
      return this.informationService.addInformation(informationData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateInformation(
    @Param('id') id : string,
    @Body() newInformation: updateInformationDto , @User() user
      ): Promise<InformationEntity> {
      return this.informationService.putInformation(id, newInformation,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteInformation(
    @Param('id') id: string,
    @User() user
  ) {
    return this.informationService.softDeleteInformation(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreInformation(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.informationService.restoreInformation(id, user);
  }
}
