import { ApiProperty } from "@nestjs/swagger";

export class UserPictureDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    pictureData: string | null;
}