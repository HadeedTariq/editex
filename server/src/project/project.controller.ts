import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  ValidationPipe,
  Query,
  Patch,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createProject(
    @Body(ValidationPipe) createProjectDto: CreateProjectDto,
    @Req() req: Request,
  ) {
    return this.projectService.create(createProjectDto, req);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  getMyProjects(@Req() req: Request) {
    return this.projectService.getMyProjects(req);
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  deleteMyProject(@Req() req: Request, @Query('id') id: string) {
    return this.projectService.deleteMyProject(id, req);
  }

  @UseGuards(AuthGuard)
  @Get('publicProjects')
  getAllPublicProjects() {
    return this.projectService.getAllPublicProjects();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getProjectById(@Param('id') id: string, @Req() req: Request) {
    return this.projectService.getProjectById(id, req);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editProject(@Param('id') id: string, @Req() req: Request) {
    return this.projectService.editProject(id, req);
  }
}
