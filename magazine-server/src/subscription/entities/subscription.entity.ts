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

  @Column({ unique: false })
  date: Date;
}
