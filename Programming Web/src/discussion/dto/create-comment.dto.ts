import {AutoMap} from "nestjsx-automapper";
import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateCommentDto {
    @AutoMap()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text: string;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    topicId: number;
}
