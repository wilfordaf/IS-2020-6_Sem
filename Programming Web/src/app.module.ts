import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entities/user.entity";
import { ProjectTag } from "./project/entities/project-tag.entity";
import { Project } from "./project/entities/project.entity";
import { Topic } from "./discussion/entities/topic.entity";
import { Comment } from "./discussion/entities/comment.entity";
import { Assessment } from "./discussion/entities/assessment.entity";
import { ProjectModule } from "./project/project.module";
import { UserModule } from "./user/user.module";
import { DiscussionModule } from "./discussion/discussion.module";
import { AuthModule } from "./auth/auth.module";
import { APP_FILTER } from "@nestjs/core";
import { ForbiddenExceptionFilter } from "./tools/interceptorForbidden";

@Module({
    imports: [TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.HOST,
                port: 5432,
                username: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                ssl: true,
                extra: {
                    ssl: {
                        "rejectUnauthorized": false
                    }
                },
                entities: [User, Topic, Assessment, Comment, ProjectTag, Project],
                synchronize: true,
            }),
        }),
        ProjectModule,
        UserModule,
        DiscussionModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [{
        provide: APP_FILTER,
        useClass: ForbiddenExceptionFilter
    }],
})
export class AppModule {}
