import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HashTag } from './hashtag.entity';

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  image: string;

  @Column()
  validTime: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => HashTag)
  @JoinTable()
  hashtags: HashTag[];
}
