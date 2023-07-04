import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectTag } from "./entities/project-tag.entity";
import { CreateTagDto } from "./dto/create-tag.dto";

@Injectable()
export class ProjectTagService {
  constructor(
    @InjectRepository(ProjectTag)
    private readonly projectTagRepository: Repository<ProjectTag>
  ) {}

  async getById(id: number) {
    const tag = await this.projectTagRepository.findOneBy({ id });
    if (tag === null) {
      throw new NotFoundException();
    }

    return tag;
  }

  async findAll() {
    return await this.projectTagRepository.find();
  }

  async create(createTagDto: CreateTagDto) {
    const tag = new ProjectTag();
    tag.name = createTagDto.tagName
    await this.projectTagRepository.save(tag);
    return tag;
  }

  async delete(id: number) {
    await this.projectTagRepository.delete(id);
  }
}