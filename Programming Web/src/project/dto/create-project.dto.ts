import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProjectDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(30)
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    pictureData: string | null;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    repositoryLink: string;

    @ApiProperty({ isArray: true, type: () => Number })
    @IsNotEmpty()
    tagIds: number[];
}
