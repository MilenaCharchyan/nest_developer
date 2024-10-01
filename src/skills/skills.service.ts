import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Developer } from 'src/developer/entities/developer.entity';
import { Model } from 'mongoose';
import { Skill } from './entities/skill.entity';
import e from 'express';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel('Developer') private developerModel: Model<Developer>,
    @InjectModel('Skill') private skillModel: Model<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const { name } = createSkillDto
    const skill = await this.skillModel.findOne({ name });
    if (skill) {
      return "skills hes already"
    } else {
      return await this.skillModel.create({ ...createSkillDto})
    }
  }

  async findAll() {
    return await this.skillModel.find().select('name').exec();
  }

  async findOne(id: string) {
    return await this.skillModel.findById(id).populate("developers")
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillModel.findById(id)
    if (skill) {
      await this.skillModel.findByIdAndUpdate(id, updateSkillDto)
      return await this.skillModel.findById(id)
    } else {
      throw new NotFoundException('skill not found')
    }
  }

  async remove(id: string) {
    const skill = await this.skillModel.findById(id)
    if (skill) {
      await this.skillModel.findByIdAndDelete(id)
      return true
    } else {
      return false
    }
  }
}
