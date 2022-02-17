import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

@Entity('reunion')
export class ReunionEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  ordreDuJour: string;

  @Column({ type: 'varchar' })
  discussion: string;

  @Column({ type: 'varchar' })
  decision: string;

  @Column({ type: 'varchar' })
  lieu: string;

  @Column({})
  Date: Date;
}
