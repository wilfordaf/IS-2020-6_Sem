import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { AutoMap } from "nestjsx-automapper";
import { Topic } from "./topic.entity";
import { Assessment } from "./assessment.entity";

@Entity()
export class Comment {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column({ type: 'text' })
    text: string;

    @AutoMap()
    @Column()
    date: Date;

    @AutoMap()
    @ManyToOne(() => User, user => user.comments,
        { onDelete: 'CASCADE' })
    user: User;

    @AutoMap()
    @ManyToOne(() => Topic, topic => topic.comments,
        { onDelete: 'CASCADE' })
    topic: Topic;

    @AutoMap()
    @OneToMany(() => Assessment, assessment => assessment.comment,
        { cascade: true })
    assessments: Assessment[];
}