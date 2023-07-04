import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from "typeorm";
import { Comment } from "./comment.entity";
import { Project } from "../../project/entities/project.entity";
import { AutoMap } from "nestjsx-automapper";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Topic {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @ManyToOne(() => Project, project => project.topics,
        { onDelete: 'CASCADE' })
    project: Project;

    @AutoMap()
    @OneToMany(() => Comment, comment => comment.topic,
        { cascade: true })
    comments: Comment[];

    @AutoMap()
    @ManyToOne(() => User, user => user.topics,
        { onDelete: 'CASCADE' })
    user: User;

    @AutoMap()
    @Column()
    date: Date;
}
