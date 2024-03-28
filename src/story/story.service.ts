import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { HashTag } from './entities/hashtag.entity';
import { CreateStoryRequestDto } from './dto/request/create-story-request.dto';
import { CreateStoryResponseDto } from './dto/response/create-story-response.dto';

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
}
