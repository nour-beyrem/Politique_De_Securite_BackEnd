/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddIncidentDto } from 'src/DTO/incident/addIncident';
import { updateIncidentDto } from 'src/DTO/incident/updateIncident';
import { IncidentEntity } from 'src/entities/incident.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { IncidentService } from './incident.service';

@Controller('incident')
export class IncidentController {

    constructor(private incidentService: IncidentService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<IncidentEntity[]> {
       return this.incidentService.getIncident(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getIncidentById(
      @Param('id') id: string, @User() user
    ): Promise<IncidentEntity>{
      const incident = await this.incidentService.getById(id,user);

      if (incident)
         return incident;
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    addIncident(
      @Body() incidentData:AddIncidentDto , @User() user
    ){
      return this.incidentService.addIncident(incidentData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateIncident(
    @Param('id') id : string,
    @Body() newIncident: updateIncidentDto , @User() user
      ): Promise<IncidentEntity> {
      return this.incidentService.putIncident(id, newIncident,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteIncident(
    @Param('id') id: string,
    @User() user
  ) {
    return this.incidentService.softDeleteIncident(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreIncident(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.incidentService.restoreIncident(id, user);
  }
}
