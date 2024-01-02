import { Magazine } from 'src/magazine/entities/magazine.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MagSubscription {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  userId: number;

  @Column({ unique: false })
  magazineId: number;
  magazineDetail: any;
  userDetail: string;

  @Column({ unique: false })
  price: number;

  @Column({ type: 'enum', enum: ['weekly', 'monthly', 'yearly'] })
  type: string;

  @Column({ unique: false })
  isActive: boolean;

  @Column({ unique: false })
  startDate: Date;

  @Column({ unique: false })
  endDate: Date;
}
