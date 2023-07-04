import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "../project/entities/project.entity";
import { Topic } from "./entities/topic.entity";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { Comment } from "./entities/comment.entity";
import { User } from "../user/entities/user.entity";

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async getById(id: number) {
    const topic = await this.topicRepository.findOne({where:{ id }, relations: {
        comments: { assessments: { user: true }, user: true }, user: true, project: true
      }} );
    if (topic === null) {
      throw new NotFoundException();
    }

    return topic;
  }

  async findAll() {
    return await this.topicRepository.find({relations: {
      comments: { assessments: { user: true }, user: true }, user: true, project: true }});
  }

  async create(nickname: string, createTopicDto: CreateTopicDto) {
    const user = await this.userRepository.findOneBy({ nickname: nickname });
    if (!user) {
      throw new NotFoundException(`User with name '${nickname}' does not exist`);
    }

    const project = await this.projectRepository.findOneBy({ id: createTopicDto.projectId });
    if (project === null) {
      throw new NotFoundException(`Project with id ${createTopicDto.projectId} was not found`);
    }
    
    const topic = new Topic();
    topic.project = project;
    topic.name = createTopicDto.name;
    topic.user = user;
    topic.date = new Date();
    await this.topicRepository.save(topic);
    return topic;
  }

  async delete(nickname: string, id: number) {
    const user = await this.userRepository.findOneBy({ nickname: nickname });
    if (!user) {
      throw new NotFoundException(`User with name '${nickname}' does not exist`);
    }

    const topic = await this.topicRepository.findOne({ where: { id }, relations: { user: true } });
    if (!topic) {
      throw new NotFoundException(`Topic with id '${id}' does not exist`);
    }

    if (topic.user.nickname !== nickname) {
      throw new ForbiddenException(`User can't delete topic with id ${id}`);
    }

    await this.topicRepository.delete(id);
  }
}