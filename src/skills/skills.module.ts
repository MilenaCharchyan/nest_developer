import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JoiPipeModule } from 'nestjs-joi';
import { DeveloperSchema } from 'src/developer/entities/developer.entity';
import { SkillSchema } from './entities/skill.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: "Developer", schema: DeveloperSchema },
    { name: "Skill", schema: SkillSchema }
  ]), JoiPipeModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
