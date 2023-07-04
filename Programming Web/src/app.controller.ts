import { Get, Controller, Render, UseInterceptors, UseGuards } from "@nestjs/common";
import { ExecutionTimeInterceptor } from './tools/interceptorLoadTime';
import { ApiExcludeController } from "@nestjs/swagger";
import { Auth0Guard } from "./auth/auth0.guard";

@Controller()
@UseInterceptors(ExecutionTimeInterceptor)
@ApiExcludeController()
export class AppController {
  @Get("/projects-page")
  @Render('index')
  introductionPage() {
    return {};
  }

  @Get("/discussions")
  @Render('discussions')
  discussionsPage() {
    return {};
  }

  @Get("/rules")
  @Render('rules')
  rulesPage() {
    return {};
  }

  @Get("/author")
  @Render('author')
  authorPage() {
    return {};
  }

  @UseGuards(Auth0Guard)
  @Get("/add-project")
  @Render('add-project')
  addProjectPage() {
    return {};
  }

  @UseGuards(Auth0Guard)
  @Get("/project")
  @Render('project')
  projectPage() {
    return {};
  }

  @UseGuards(Auth0Guard)
  @Get("/discussion")
  @Render('discussion')
  discussionPage() {
    return {};
  }

  @UseGuards(Auth0Guard)
  @Get("/add-tag")
  @Render('add-tag')
  addTagPage() {
    return {};
  }

  @UseGuards(Auth0Guard)
  @Get("/edit-project")
  @Render('edit-project')
  editProjectPage() {
    return {};
  }

  @UseGuards(Auth0Guard)
  @Get("/profile")
  @Render('profile')
  profilePage() {
    return {};
  }

  @UseGuards(Auth0Guard)
  @Get("/edit-user")
  @Render('edit-user')
  userPage() {
    return {};
  }
}