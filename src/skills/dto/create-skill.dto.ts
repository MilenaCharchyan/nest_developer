import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";

export class CreateSkillDto {
    @ApiProperty({ default: "JavaScript" })
    @JoiSchema(Joi.string().required())
    name: string;
}
