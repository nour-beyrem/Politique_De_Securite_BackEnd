import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

@Entity('rapport')
export class RapportEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  titre: string;
  @Column({ type: 'varchar' })
  type: string;
  @Column({ type: 'varchar' })
  sujet: string;
  @Column({ type: 'varchar' })
  contenu: string;
  @Column({})
  Date: Date;
  @Column({ type: 'varchar' })
  filePath: string;
}
