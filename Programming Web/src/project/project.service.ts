import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./entities/project.entity";
import { User } from "../user/entities/user.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectTag } from "./entities/project-tag.entity";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ProjectTag)
    private readonly projectTagRepository: Repository<ProjectTag>
  ) {}

  async getById(id: number) {
    const project = await this.projectRepository.findOne({ where: {id}, relations: { user: true, tags: true } });
    if (project === null) {
      throw new NotFoundException();
    }

    return project;
  }

  async findAll() {
    return await this.projectRepository.find({relations: { user: true, tags: true }});
  }

  async create(nickname: string, createProjectDto: CreateProjectDto) {
    const user = await this.userRepository.findOneBy({ nickname: nickname });
    if (!user) {
      throw new NotFoundException(`User with name '${nickname}' does not exist`);
    }

    const project = new Project();
    project.name = createProjectDto.name;
    project.description = createProjectDto.description;
    project.pictureData = createProjectDto.pictureData;
    project.repositoryLink = createProjectDto.repositoryLink;
    project.user = user;
    project.tags = [];
    for (const id of createProjectDto.tagIds) {
      const tag = await this.projectTagRepository.findOneBy({ id });
      project.tags.push(tag);
    }

    await this.projectRepository.save(project);
    return project;
  }

  async update(nickname: string, updateProjectDto: UpdateProjectDto) {
    const user = await this.userRepository.findOneBy({ nickname: nickname });
    if (!user) {
      throw new NotFoundException(`User with name '${nickname}' does not exist`);
    }

    const project = await this.projectRepository.findOne({ where: { id: updateProjectDto.id }, relations: { user: true, tags: true } });
    if (project === null) {
      throw new NotFoundException();
    }

    if (project.user.nickname !== nickname) {
      throw new ForbiddenException(`User can't update project with id ${ updateProjectDto.id }`);
    }

    project.description = updateProjectDto.description;
    project.repositoryLink = updateProjectDto.repositoryLink;
    project.pictureData = updateProjectDto.pictureData;
    await this.projectRepository.save(project);
    return project;
  }

  async delete(nickname: string, id: number) {
    const user = await this.userRepository.findOneBy({ nickname: nickname });
    if (!user) {
      throw new NotFoundException(`User with name '${nickname}' does not exist`);
    }

    const project = await this.projectRepository.findOne({ where: {id}, relations: { user: true } });
    if (!project) {
      throw new NotFoundException(`Project with id '${id}' does not exist`);
    }

    if (project.user.nickname !== nickname) {
      throw new ForbiddenException(`User can't delete project with id ${id}`);
    }

    await this.projectRepository.delete(id);
  }
}