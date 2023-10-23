import { Controller, Get, Post, Put, Delete, Param, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
import { UpdateNinjadto } from './dto/update-ninja.dto';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) { }
    //GET /ninjas --> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'Shuriken' | 'Katana') {
        return this.ninjasService.getNinjas(weapon);
    }

    //GET /ninja/:id --> { ... }
    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.ninjasService.getNinja(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
    //POST /ninjas
    @Post()
    addNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjasService.createNinja(createNinjaDto);
    }
    //PUT /ninjas/:id --> { ... }
    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjadto: UpdateNinjadto) {
        return this.ninjasService.updateNinja(+id, updateNinjadto);
    }
    //DELETE /ninjas/:id
    @Delete(':id')
    removeNinja(@Param('id') id: string) {
        return this.ninjasService.removeNinja(+id);
    }
}