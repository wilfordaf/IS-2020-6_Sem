import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class PaginationDataDto {
    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    page: number;

    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    limit: number;
}