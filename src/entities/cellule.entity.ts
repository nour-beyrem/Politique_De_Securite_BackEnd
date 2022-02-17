import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { UserEntity } from './user.entity';

@Entity('cellule')
export class CelluleEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  president: string;

  @Column({ type: 'varchar' })
  membre1: string;

  @Column({ type: 'varchar' })
  membre2: string;
}
