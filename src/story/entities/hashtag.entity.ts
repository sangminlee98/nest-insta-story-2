import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Story } from './story.entity';

@Entity()
export class HashTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashtag: string;

  @ManyToMany(() => Story, (story) => story.hashtags)
  stories: Story[];
}
