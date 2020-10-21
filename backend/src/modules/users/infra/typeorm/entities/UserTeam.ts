import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import User from './User';
import Team from './Team';

@Entity('users_teams')
class UserTeam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  team_id: string;

  @ManyToOne(() => User, user => user.userTeam)
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @ManyToOne(() => Team, team => team.userTeam)
  @JoinColumn({ name: 'team_id' })
  team: Team[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updated_at: Date;
}

export default UserTeam;
