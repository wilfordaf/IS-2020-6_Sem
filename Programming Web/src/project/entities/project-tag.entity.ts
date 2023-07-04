import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import {AutoMap} from "nestjsx-automapper";
import { Project } from "./project.entity";

@Entity()
export class ProjectTag {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @ManyToMany(() => Project, project => project.tags)
    projects: Project[];
}