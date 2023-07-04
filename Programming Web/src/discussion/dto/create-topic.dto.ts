import {AutoMap} from "nestjsx-automapper";
import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateTopicDto {
    @AutoMap()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    projectId: number;
}
