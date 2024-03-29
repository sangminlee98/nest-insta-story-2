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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateStoryResponseDto } from './dto/response/create-story-response.dto';

@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '스토리 생성 API',
    description: '12시간 또는 24시간 동안 유효한 인스타 스토리를 생성합니다.',
  })
  @ApiBody({ type: CreateStoryRequestDto })
  @ApiResponse({ status: 201, description: '스토리 생성 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async createStory(
    @Body() request: CreateStoryRequestDto,
  ): Promise<CreateStoryResponseDto> {
    return await this.storyService.createStory(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getStories(@Query() request: PaginationDto) {
    return await this.storyService.getStories(request);
  }
}
