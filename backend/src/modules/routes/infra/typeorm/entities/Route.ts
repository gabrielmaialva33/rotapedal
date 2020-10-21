import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

enum DifficultEnum {
  'EASY',
  'NORMAL',
  'HARD',
}

export interface IPoint {
  latidute: number;
  longitude: number;
}

@Entity('routes')
class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  extension: number;

  @Column({ type: 'float' })
  elevation: number;

  @Column({ type: 'enum', enum: DifficultEnum, default: DifficultEnum.NORMAL })
  difficult: string;

  @Column({ type: 'int' })
  stop_points: number;

  @Column({
    type: 'point',
    transformer: {
      from: v => v,
      to: v => [v.latidute, v.longitude],
    },
  })
  point_A: IPoint;

  @Column({
    type: 'point',
    transformer: {
      from: v => v,
      to: v => [v.latidute, v.longitude],
    },
  })
  point_B: IPoint;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default Route;
