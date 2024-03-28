export class CreateStoryResponseDto {
  id: number;
  createdAt: Date;
  validTime: number;
  title: string;
  author: string;
  image: string;
  hashtags: string[];
}
