import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Developer } from "src/developer/entities/developer.entity";

export type SkillDocument = HydratedDocument<Skill>;

@Schema()
export class Skill {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop({ type: [{type:mongoose.Schema.Types.ObjectId, ref:"Developer"}] })
  developers: Developer[];
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
