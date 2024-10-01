import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto,  @Res() res: Response) {
    try {
      const data = await this.skillsService.create( createSkillDto)
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.skillsService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res: Response) {
    try {
      const data = await this.skillsService.findOne(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto,@Res() res: Response) {
    try {
      const data = await this.skillsService.update(id, updateSkillDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Res() res: Response) {
    try {
      const data = await this.skillsService.remove(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message })
    }
  }
}
