import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, Length} from "class-validator";

export class CreateTagDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1, 10)
    tagName: string;
}
