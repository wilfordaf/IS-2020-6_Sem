import { AutoMap } from "nestjsx-automapper";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min, MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    id: number

    @AutoMap()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(2, 18)
    firstname: string;

    @AutoMap()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(2, 18)
    lastname: string;

    @AutoMap()
    @ApiProperty()
    @IsString()
    @IsOptional()
    pictureData: string | null;
}