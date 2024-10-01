import { PartialType } from '@nestjs/swagger';
import { CreateDeveloperDto } from './create-developer.dto';
import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";

export class UpdateDeveloperDto  {
    @ApiProperty({ default: "John" })
    @JoiSchema(Joi.string())
    name: string;

    @ApiProperty({ default: "Doe" })
    @JoiSchema(Joi.string())
    surname: string;

    @ApiProperty({ default: 25 })
    @JoiSchema(Joi.number().integer().min(1).max(200))
    age: number;

    @ApiProperty({ example: ["JavaScript:id", "TypeScript", "Python"] })
    @JoiSchema(Joi.array().items(Joi.string()))
    skills: string[];
}
