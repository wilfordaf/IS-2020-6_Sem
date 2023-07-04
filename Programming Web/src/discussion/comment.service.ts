import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Topic } from "./entities/topic.entity";
import { User } from "../user/entities/user.entity";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async getById(id: number) {
    const comment = await this.commentRepository.findOne({where:{ id }, relations: {
      assessments: { user: true }, user: true
      }} );
    if (comment === null) {
      throw new NotFoundException();
    }

    return comment;
  }

  async findAll() {
    return await this.commentRepository.find({relations: {
        assessments: { user: true }, user: true
      }});
  }

  async findByTopicId(id: number, page: number, limit: number) {
    const topic = await this.topicRepository.findOneBy({ id });
    if (topic === null) {
      throw new NotFoundException(`Topic with id ${ id } does not exist`);
    }

    const [comments, total] = await this.commentRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where: { topic },
      relations: {
        user: true,
        assessments: { user: true }
      }
    })

    return [comments, total];
  }

  async create(nickname: string, createCommentDto: CreateCommentDto) {
    const user = await this.userRepository.findOneBy({ nickname: nickname });
    if (!user) {
      throw new NotFoundException(`User with name '${nickname}' does not exist`);
    }

    const topic = await this.topicRepository.findOneBy({ id: createCommentDto.topicId });
    if (topic === null) {
      throw new NotFoundException(`Topic with id ${createCommentDto.topicId} was not found`);
    }
    
    const comment = new Comment();
    comment.user = user;
    comment.topic = topic;
    comment.text = createCommentDto.text;
    comment.date = new Date();
    comment.user = user;
    await this.commentRepository.save(comment);
    return comment
  }

  async delete(nickname: string, id: number) {
    const user = await this.userRepository.findOneBy({ nickname: nickname });
    if (!user) {
      throw new NotFoundException(`User with name '${nickname}' does not exist`);
    }

    const comment = await this.commentRepository.findOne({ where: {id}, relations: { user: true } });
    if (!comment) {
      throw new NotFoundException(`Comment with id '${id}' does not exist`);
    }

    if (comment.user.nickname !== nickname) {
      throw new ForbiddenException(`User can't delete comment with id ${id}`);
    }

    await this.commentRepository.delete(id);
  }
}