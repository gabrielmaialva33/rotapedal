import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Route, { IPoint } from '@modules/routes/infra/typeorm/entities/Route';
import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

@Entity('supporters')
class Supporter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  route_id: string;

  @ManyToOne(() => Route)
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  services: string;

  @Column()
  logo: string;

  @Column()
  link: string;

  @Column({
    type: 'point',
    transformer: {
      from: v => v,
      to: v => [v.latidute, v.longitude],
    },
  })
  point: IPoint;

  @Expose({ name: 'logo_url' })
  get getLogoUrl(): string | null {
    if (!this.logo) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.logo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.logo}`;
      default:
        return null;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Supporter;
