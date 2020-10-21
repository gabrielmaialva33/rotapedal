import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('bikes')
class Bike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  nickname: string;

  @Column()
  model: string;

  @Column({ type: 'date' })
  manufacturing_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Bike;
