import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from './User';
import UserTeam from './UserTeam';

@Entity('teams')
class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner' })
  user: User;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UserTeam, userTeam => userTeam.team)
  userTeam!: UserTeam[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default Team;
