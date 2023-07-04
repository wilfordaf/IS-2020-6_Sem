import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Comment } from "./comment.entity";
import { AutoMap } from "nestjsx-automapper";

export enum AssessmentType {
    Positive = 1,
    Negative = 2
}

@Entity()
export class Assessment {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column('int')
    type: AssessmentType;

    @AutoMap()
    @ManyToOne(() => User, user => user.assessments,
        { onDelete: 'CASCADE' })
    user: User;

    @AutoMap()
    @ManyToOne(() => Comment, comment => comment.assessments,
        { onDelete: 'CASCADE' })
    comment: Comment;
}