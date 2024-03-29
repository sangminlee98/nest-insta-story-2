import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsString, IsUrl, Matches } from 'class-validator';

export class CreateStoryRequestDto {
  @IsInt()
  @IsIn([12, 24], {
    message: 'ValidTime은 12 또는 24로만 설정 가능합니다.',
  })
  @ApiProperty({
    description: 'ValidTime은 12 또는 24로만 설정 가능합니다.',
    example: 12,
  })
  validTime: number;

  @IsString()
  @ApiProperty({
    example: '어쩌다 Nest',
  })
  title: string;

  @ApiProperty({
    example: '어쩌다',
  })
  @IsString()
  author: string;

  @IsUrl()
  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  image: string;

  @IsString({ each: true })
  @Matches(/#[^\s#]+/g, {
    each: true,
    message: '모든 해시태그는 #으로 시작해야 합니다.',
  })
  @ApiProperty({
    example: ['#어쩌다', '#Nest', '#당근'],
  })
  hashtags: string[];
}
