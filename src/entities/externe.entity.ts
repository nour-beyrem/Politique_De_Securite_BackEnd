import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

@Entity('externe')
export class ExterneEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  nom: string;

  @Column({ type: 'varchar' })
  prenom: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  ref: string;

  @Column({ type: 'varchar' })
  raisonSocial: string;

  @Column({ type: 'varchar' })
  responsable: string;

  @Column({ type: 'varchar' })
  intervenant: string;

  @Column({ type: 'varchar' })
  domaine: string;

  @Column({})
  tel: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  faculte: string;

  @Column({ type: 'varchar' })
  type_Stage: string;

  @Column({})
  DateDebut: Date;

  @Column({})
  DateFin: Date;

  @Column({ type: 'varchar' })
  deQuoi: string;
}
