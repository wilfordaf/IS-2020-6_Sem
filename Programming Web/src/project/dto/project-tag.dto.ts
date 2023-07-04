import {AutoMap} from "nestjsx-automapper";
import {ApiProperty} from "@nestjs/swagger";

export class ProjectTagDto {
    @AutoMap()
    @ApiProperty()
    id: number;

    @AutoMap()
    @ApiProperty()
    name: string;
}