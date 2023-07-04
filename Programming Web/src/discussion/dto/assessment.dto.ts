import { AssessmentType } from "../entities/assessment.entity";
import { AutoMap } from "nestjsx-automapper";
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../../user/dto/user.dto";

export class AssessmentDto {
    @AutoMap()
    @ApiProperty()
    id: number;

    @AutoMap()
    @ApiProperty()
    type: AssessmentType;

    @AutoMap()
    @ApiProperty()
    user: UserDto;
}