import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryRequestDto } from './dto/request/create-story-request.dto';

@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createStory(@Body() request: CreateStoryRequestDto) {
    return await this.storyService.createStory(request);
  }
}
