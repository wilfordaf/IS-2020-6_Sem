import {AutoMap} from "nestjsx-automapper";
import {ApiProperty} from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";
import { AssessmentType } from "../entities/assessment.entity";

export class CreateAssessmentDto {
    @AutoMap()
    @ApiProperty({ enum: AssessmentType })
    @IsNotEmpty()
    @IsEnum(AssessmentType)
    type: AssessmentType;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    commentId: number;
}
