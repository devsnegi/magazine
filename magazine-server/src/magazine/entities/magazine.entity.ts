import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Magazine {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'varchar', length: 100 })
  publication: string;

  @Column({ type: 'int' })
  issue: number;

  @Column({ type: 'varchar', length: 200 })
  imageurl: string;
}
