import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PfeDto } from 'src/dto/pfe.dto';
import { PfeService } from './pfe.service';

@Controller('pfe')
export class PfeController {
    constructor(private pfeService: PfeService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getPfes(@Request() req) {
        return this.pfeService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createPfe(@Body() pfeDto: PfeDto) {
        return this.pfeService.createPfe(pfeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updatePfe(@Param('id') id: string, @Body() pfeDto: PfeDto) {
        return this.pfeService.updatePfe(id, pfeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePfe(@Param('id') id: string) {
        return this.pfeService.deletePfe(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("student/:id")
    async getPfeByStudentId(@Param('id') sid: string) {
        return this.pfeService.findByStudentId(sid);
    }

    @UseGuards(JwtAuthGuard)
    @Get("supervisor/:id")
    getPfeBySupervisorId(@Param('id') sid: string) {
        return this.pfeService.findBySupervisorId(sid);
    }
}
