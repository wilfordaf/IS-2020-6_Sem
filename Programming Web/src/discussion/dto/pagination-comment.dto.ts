import { ApiProperty } from "@nestjs/swagger";
import { CommentDto } from "./comment.dto";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class PaginationCommentDto {
    @ApiProperty()
    totalPages: number;

    @ApiProperty({ isArray: true, type: () => CommentDto })
    comments: CommentDto[];
}
