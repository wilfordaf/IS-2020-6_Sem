import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm";
import { ProjectTag } from './project-tag.entity';
import { Topic } from "../../discussion/entities/topic.entity";
import { AutoMap } from "nestjsx-automapper";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Project {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column({ type: 'text' })
    description: string;

    @AutoMap()
    @Column({ type: 'text' })
    repositoryLink: string;

    @AutoMap()
    @Column({ type: 'text', nullable: true })
    pictureData: string | null;

    @AutoMap()
    @OneToMany(() => Topic, topic => topic.project,
        { cascade: true })
    topics: Topic[];

    @AutoMap()
    @ManyToOne(() => User, user => user.projects,
        { onDelete: 'CASCADE' })
    user: User;

    @AutoMap()
    @ManyToMany(() => ProjectTag, projectTag => projectTag.projects)
    @JoinTable()
    tags: ProjectTag[];
}
