import { IsEnum, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  userId: number;

  @Column({ unique: false })
  magazineId: number;
  magazineDetail: any;
  userDetail: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'int', unique: false })
  price: number;

  @Column({ type: 'enum', enum: ['weekly', 'monthly', 'yearly'] })
  type: string;

  @Column({ unique: false })
  date: Date;
}
