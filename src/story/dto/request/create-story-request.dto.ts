import { IsIn, IsInt, IsString, IsUrl, Matches } from 'class-validator';

export class CreateStoryRequestDto {
  @IsInt()
  @IsIn([12, 24], {
    message: 'ValidTime은 12 또는 24로만 설정 가능합니다.',
  })
  validTime: number;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsUrl()
  image: string;

  @IsString({ each: true })
  @Matches(/#[^\s#]+/g, {
    each: true,
    message: '모든 해시태그는 #으로 시작해야 합니다.',
  })
  hashtags: string[];
}
