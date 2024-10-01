import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { JoiPipeModule } from 'nestjs-joi';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperSchema } from './entities/developer.entity';
import { SkillSchema } from 'src/skills/entities/skill.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: "Developer", schema: DeveloperSchema },
    { name: "Skill", schema: SkillSchema }
  ]), JoiPipeModule],
  controllers: [DeveloperController],
  providers: [DeveloperService],
})
export class DeveloperModule {}
