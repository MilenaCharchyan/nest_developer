import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";

export class UpdateSkillDto {
    @ApiProperty({ default: "JavaScript" })
    @JoiSchema(Joi.string())
    name: string;
}
