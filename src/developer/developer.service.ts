import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from 'src/skills/entities/skill.entity';
import { Developer } from './entities/developer.entity';

@Injectable()
export class DeveloperService {

  constructor(
    @InjectModel('Developer') private developerModel: Model<Developer>,
    @InjectModel('Skill') private skillModel: Model<Skill>,
  ) { }


  async create(createDeveloperDto: CreateDeveloperDto) {
    const { skills } = createDeveloperDto;
    for (let e of skills) {
      const s = await this.skillModel.findById(e);
      if (!s) {
        throw new BadRequestException("skills not found");
      }
    }
    const dev = await this.developerModel.create({ ...createDeveloperDto })
    for (let e of skills) {
      const s = await this.skillModel.findById(e);
      await this.skillModel.findByIdAndUpdate(s, { $push: { developers: dev._id } })
    }
    return dev;
  }

  async findAll() {
    return await this.developerModel.find().select('name').exec();
  }

  async findOne(id: string) {
    return await this.developerModel.findById(id).populate("skills")
  }


  async filtserBySkill(skillId: string) {
    const skillExists = await this.skillModel.findById(skillId);
    if (!skillExists) {
      throw new NotFoundException('Skill not found');
    }
    return await this.developerModel.find({ skills: skillId }) .populate('skills') .exec();
  }

  async findsearch(name: string) {
    return await this.developerModel
      .find({
        $or: [
          { name: name },    
          { surname: name },
        ],
      })
      .populate('skills') 
      .exec();
  }


  async update(id: string, updateDeveloperDto: UpdateDeveloperDto) {
    const developer = await this.developerModel.findById(id)
    if (developer) {
      const { skills } = updateDeveloperDto;
      if (skills) {
        for (let e of skills) {
          const s = await this.skillModel.findById(e);
          if (!s) {
            throw new BadRequestException("skills not found");
          }
        }
        for (let e of skills) {
          const s = await this.skillModel.findById(e);
          await this.developerModel.findByIdAndUpdate(developer, { $push: { skills: s._id } })
          await this.skillModel.findByIdAndUpdate(s, { $push: { developers: developer._id } })
        }
      } else {
        await this.developerModel.findByIdAndUpdate(id, updateDeveloperDto)
      }
      return await this.developerModel.findById(id)
    } else {
      throw new NotFoundException('developer not found')
    }
  }

  async remove(id: string) {
    const developer = await this.developerModel.findById(id)
    if (developer) {
      await this.developerModel.findByIdAndDelete(id)
      return true
    } else {
      return false
    }
  }
  async removeskills(id: string, skillId:string) {
    const developer = await this.developerModel.findById(id)
    if (developer) {
      const s = await this.skillModel.findById(skillId);
      if (!s) {
        throw new BadRequestException("skills not found");
      }      
      await this.developerModel.findByIdAndUpdate(developer, { $pull: { skills: s._id } })
      await this.skillModel.findByIdAndUpdate(s, { $pull: { developers: developer._id } })
      return true
    } else {
      return false
    }
  }
}
