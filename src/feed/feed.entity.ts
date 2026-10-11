import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';


@Entity()
export class Feed {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: 'text' })
  content: string;


  @ManyToOne(() => User)
  user: User;


  @CreateDateColumn()
  created_at: Date;

}