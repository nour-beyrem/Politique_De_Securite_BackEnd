/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddExterneDto } from 'src/DTO/externe/addExterne';
import { updateExterneDto } from 'src/DTO/externe/updateExterne';
import { ExterneEntity } from 'src/entities/externe.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { ExterneService } from './externe.service';

@Controller('externe')
export class ExterneController {

    constructor(private externeService: ExterneService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<ExterneEntity[]> {
       return this.externeService.getExterne(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getExterneById(
      @Param('id') id: string, @User() user
    ): Promise<ExterneEntity[]>{
      const externe = await this.externeService.getById(id,user);

      if (externe)
         return externe;
    }

    

    @Post()
   
    addExterne(
      @Body() externeData:AddExterneDto 
    ){
      return this.externeService.addExterne(externeData);
    }

    @Get('type/:type')
    @UseGuards(JwtAuthGuard)
    getExterneByType(
         @Param('type') type: string , @User() user
        ): Promise<ExterneEntity[]> {
         return this.externeService.getByType(type,user);
       }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateExterne(
    @Param('id') id : string,
    @Body() newExterne: updateExterneDto , @User() user
      ): Promise<ExterneEntity> {
      return this.externeService.putExterne(id, newExterne,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeleteExterne(
    @Param('id') id: string,
    @User() user
  ) {
    return this.externeService.softDeleteExterne(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreExterne(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.externeService.restoreExterne(id, user);
  }
}
