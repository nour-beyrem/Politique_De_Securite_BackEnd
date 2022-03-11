/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddDocumentDto } from 'src/DTO/document/addDocument';
import { updateDocumentDto } from 'src/DTO/document/updateDocument';
import { PolitiqueEntity } from 'src/entities/politique.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {

    
    constructor(private documentService: DocumentService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<PolitiqueEntity[]> {
       return this.documentService.getPolitique(user);
    }

 



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getPolitiqueById(
      @Param('id') id: string, @User() user
    ): Promise<PolitiqueEntity[]>{
      const politique = await this.documentService.getById(id,user);

      if (politique)
         return politique;
    }

    @Get('politique/:qui')
    getPolitiqueByRole(
         @Param('qui') qui: string 
        ): Promise<PolitiqueEntity[]> {
         return this.documentService.getPolitiquebyqui(qui);
       }


       @Get('type/:typeChapitre')
       getPolitiqueByTpe(
            @Param('typeChapitre') typeChapitre: string 
           ): Promise<PolitiqueEntity> {
            return this.documentService.getPolitiquebyType(typeChapitre);
          }

    @Post()
    @UseGuards(JwtAuthGuard)
    addPolitique(
      @Body() politiqueData:AddDocumentDto , @User() user
    ){
      return this.documentService.addPolitique(politiqueData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updatePolitique(
    @Param('id') id : string,
    @Body() newPolitique: updateDocumentDto , @User() user
      ): Promise<PolitiqueEntity> {
      return this.documentService.putPolitique(id, newPolitique,user);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
  async SoftdeletePolitique(
    @Param('id') id: string,
    @User() user
  ) {
    return this.documentService.softDeletePolitique(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restorePolitique(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.documentService.restorePolitique(id, user);
  }
}
