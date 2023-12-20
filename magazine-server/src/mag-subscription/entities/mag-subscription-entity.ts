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
  subscriptionId: number;

  @Column({ unique: false })
  userId: number;

  @Column({ unique: false })
  magazineId: number;
  magazineDetail: any;
  userDetail: string;

  @Column({ default: true })
  isActive: boolean;

  // @ManyToOne(() => User, (user) => user.id, { eager: true })
  // @JoinColumn()
  // userEntries: User[];

  // @OneToMany(() => Magazine, (magazine) => magazine.id, { eager: true })
  // @JoinColumn()
  // magazineEntries: Magazine[];
}
