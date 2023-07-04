import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Project } from "../../project/entities/project.entity";
import { Comment } from "../../discussion/entities/comment.entity";
import { Assessment } from "../../discussion/entities/assessment.entity";
import { AutoMap } from "nestjsx-automapper";
import { Topic } from "../../discussion/entities/topic.entity";

@Entity()
export class User {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column({ unique: true })
    nickname: string;

    @AutoMap()
    @Column({ nullable: true })
    firstname: string | null;

    @AutoMap()
    @Column({ nullable: true })
    lastname: string | null;

    @AutoMap()
    @Column({ unique: true })
    email: string;

    @AutoMap()
    @Column({ type: 'text', nullable: true })
    pictureData: string | null;

    @AutoMap()
    @OneToMany(() => Project, project => project.user,
        { cascade: true })
    projects: Project[];

    @AutoMap()
    @OneToMany(() => Assessment, assessment => assessment.user,
        { cascade: true })
    assessments: Assessment[];

    @AutoMap()
    @OneToMany(() => Comment, comment => comment.user,
        { cascade: true })
    comments: Comment[];

    @AutoMap()
    @OneToMany(() => Topic, topic => topic.user,
        { cascade: true })
    topics: Topic[];
}