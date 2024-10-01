import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('developer')
@Controller('developer')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post()
  async create(@Body() createDeveloperDto: CreateDeveloperDto,@Res() res: Response) {
    try {
      const data = await this.developerService.create( createDeveloperDto)
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.developerService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res: Response) {
    try {
      const data = await this.developerService.findOne(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Get('filtser/:id')
  async filtserBySkill(@Param('id') id: string,@Res() res: Response) {
    try {
      const data = await this.developerService.filtserBySkill(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }
  @Get('search/:name')
  async searchfindOne(@Param('name') name: string,@Res() res: Response) {
    try {
      const data = await this.developerService.findsearch(name);
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDeveloperDto: UpdateDeveloperDto,@Res() res: Response) {
    try {
      const data = await this.developerService.update(id, updateDeveloperDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Res() res: Response) {
    try {
      const data = await this.developerService.remove(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }
  @Delete('skills/:id/:skillId')
  async removeskillls(@Param('id') id: string,@Param('skillId') skillId: string,@Res() res: Response) {
    try {
      const data = await this.developerService.removeskills(id, skillId);
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }
}
