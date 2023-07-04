import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException();
    }

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async update(nickname: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy( { nickname });
    if (!user) {
      throw new NotFoundException(`User with nickname ${nickname} does not exist`);
    }

    user.firstname = updateUserDto.firstname;
    user.lastname = updateUserDto.lastname;
    user.pictureData = updateUserDto.pictureData;
    await this.userRepository.save(user);
    return user;
  }

  async delete(id: number) {
    await this.userRepository.delete(id);
  }
}