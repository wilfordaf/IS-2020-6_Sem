import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async userExists(nickname: string) {
        return await this.userRepository.exist({ where: { nickname }})
    }

    async create(nickname: string, email: string) {
        const user = new User();
        user.nickname = nickname;
        user.email = email;
        await this.userRepository.save(user);
    }

    async getCurrentAuth(nickname: string) {
        const user = await this.userRepository.findOneBy({ nickname });
        if (user === null) {
            throw new NotFoundException();
        }

        return user;
    }
}