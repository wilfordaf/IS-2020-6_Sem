import { ApiProperty } from "@nestjs/swagger";

export class AuthUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nickname: string;
}