import { ApiProperty } from "@nestjs/swagger";
import * as Joi from "joi";
import { JoiSchema } from "nestjs-joi";

export class CreateDeveloperDto {
    @ApiProperty({ default: "John" })
    @JoiSchema(Joi.string().required())
    name: string;

    @ApiProperty({ default: "Doe" })
    @JoiSchema(Joi.string().required())
    surname: string;

    @ApiProperty({ default: 25 })
    @JoiSchema(Joi.number().integer().min(1).max(200).required())
    age: number;

    @ApiProperty({ example: ["JavaScript:id", "TypeScript", "Python"] })
    @JoiSchema(Joi.array().items(Joi.string()).required())
    skills: string[];
}
