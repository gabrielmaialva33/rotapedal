import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

import { IPoint } from '@modules/routes/infra/typeorm/entities/Route';
import Supporter from './Supporter';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  supporter_id: string;

  @ManyToOne(() => Supporter)
  @JoinColumn({ name: 'supporter_id' })
  supporter: Supporter;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  starts_in: Date;

  @Column()
  ends_in: Date;

  @Column({
    type: 'point',
    transformer: {
      from: v => v,
      to: v => [v.latitude, v.longitude],
    },
  })
  point: IPoint;

  @Column()
  link: string;

  @Column({ type: 'boolean', default: false })
  expired: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Event;
