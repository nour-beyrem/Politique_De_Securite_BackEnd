import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

@Entity('information')
export class InformationEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({})
  criticiteCID: number;

  @Column({})
  criticiteBUSINESS: number;

  @Column({ type: 'varchar' })
  ou: string;

  @Column({ type: 'varchar' })
  marquage: string;
}
