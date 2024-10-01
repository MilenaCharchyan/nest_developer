import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperModule } from './developer/developer.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-developer'), DeveloperModule, SkillsModule],
})
export class AppModule {}