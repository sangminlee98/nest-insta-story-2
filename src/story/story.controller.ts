import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryRequestDto } from './dto/request/create-story-request.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createStory(@Body() request: CreateStoryRequestDto) {
    return await this.storyService.createStory(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getStories(@Query() request: PaginationDto) {
    return await this.storyService.getStories(request);
  }
}
