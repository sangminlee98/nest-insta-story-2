import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { HashTag } from './entities/hashtag.entity';
import { CreateStoryRequestDto } from './dto/request/create-story-request.dto';
import { CreateStoryResponseDto } from './dto/response/create-story-response.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  PaginationResult,
  createPaginationResult,
} from 'src/common/utils/pagination.util';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private storyRepository: Repository<Story>,
    @InjectRepository(HashTag)
    private hashtagRepository: Repository<HashTag>,
  ) {}

  async createStory(
    dto: CreateStoryRequestDto,
  ): Promise<CreateStoryResponseDto> {
    const uniqueHashtags = [...new Set(dto.hashtags)].filter((tag) =>
      tag.startsWith('#'),
    );

    const hashtags = await Promise.all(
      uniqueHashtags.map(async (tag) => {
        let hashtag = await this.hashtagRepository
          .createQueryBuilder('ht')
          .where('ht.hashtag = :tag', { tag })
          .getOne();

        if (!hashtag) {
          hashtag = this.hashtagRepository.create({ hashtag: tag });
          await this.hashtagRepository.save(hashtag);
        }
        return hashtag;
      }),
    );
    const entity = this.storyRepository.create({
      ...dto,
      hashtags,
    });
    await this.storyRepository.save(entity);

    const response = new CreateStoryResponseDto();

    response.id = entity.id;
    response.createdAt = entity.createdAt;
    response.validTime = entity.validTime;
    response.title = entity.title;
    response.author = entity.author;
    response.image = entity.image;
    response.hashtags = entity.hashtags.map((hashtag) => hashtag.hashtag);

    return response;
  }

  async getStories(
    dto: PaginationDto,
  ): Promise<PaginationResult<CreateStoryResponseDto>> {
    const [results, total] = await this.storyRepository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.hashtags', 'hashtag')
      .where(
        'story.createdAt > DATE_SUB(CURRENT_TIMESTAMP(), INTERVAL story.validTime HOUR)',
      )
      .skip((dto.page - 1) * dto.limit)
      .take(dto.limit)
      .getManyAndCount();

    const response = new CreateStoryResponseDto();

    const data = results.map((story) => {
      response.id = story.id;
      response.createdAt = story.createdAt;
      response.validTime = story.validTime;
      response.title = story.title;
      response.author = story.author;
      response.image = story.image;
      response.hashtags = story.hashtags.map((hashtag) => hashtag.hashtag);

      return response;
    });

    return createPaginationResult(data, dto.page, dto.limit, total);
  }
}
