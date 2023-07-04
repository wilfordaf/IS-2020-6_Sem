import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class UpdateProjectDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    id: number

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
}
