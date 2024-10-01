import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Skill } from "src/skills/entities/skill.entity";

export type DeveloperDocument = HydratedDocument<Developer>;

@Schema()
export class Developer {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  age: number;

  @Prop({ type: [{type:mongoose.Schema.Types.ObjectId, ref:"Skill"}] })
  skills: Skill[];
}
export const DeveloperSchema = SchemaFactory.createForClass(Developer);