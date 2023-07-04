import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Comment } from "./entities/comment.entity";
import { Assessment } from "./entities/assessment.entity";
import { CreateAssessmentDto } from "./dto/create-assessment.dto";

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async getById(id: number) {
    const assessment = await this.assessmentRepository.findOne({ where: {id}, relations: { user: true }});
    if (assessment === null) {
      throw new NotFoundException();
    }

    return assessment;
  }

  async findAll() {
    return await this.assessmentRepository.find({relations: { user: true }});
  }

  async create(nickname: string, createAssessmentDto: CreateAssessmentDto) {
    const user = await this.userRepository.findOneBy({ nickname: nickname });
    if (!user) {
      throw new NotFoundException(`User with name '${nickname}' does not exist`);
    }

    const comment = await this.commentRepository.findOneBy({ id: createAssessmentDto.commentId });
    if (comment === null) {
      throw new NotFoundException(`Comment with id ${createAssessmentDto.commentId} was not found`);
    }
    
    const assessment = new Assessment();
    assessment.user = user;
    assessment.comment = comment;
    assessment.type = createAssessmentDto.type;
    await this.assessmentRepository.save(assessment);
    return assessment
  }

  async delete(nickname: string, id: number) {
    const user = await this.userRepository.findOneBy({ nickname: nickname });
    if (!user) {
      throw new NotFoundException(`User with name '${nickname}' does not exist`);
    }

    const assessment = await this.assessmentRepository.findOne({ where: {id}, relations: { user: true } });
    if (!assessment) {
      throw new NotFoundException(`Assessment with id '${id}' does not exist`);
    }

    if (assessment.user.nickname !== nickname) {
      throw new ForbiddenException(`User can't delete assessment with id ${id}`);
    }

    await this.assessmentRepository.delete(id);
  }
}