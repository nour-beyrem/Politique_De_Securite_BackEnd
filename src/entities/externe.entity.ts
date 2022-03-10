/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExterneRoleEnum } from 'src/user/enum/externe-role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SortieActifEntity } from './sortie-actif.entity';
import { TimestampEntity } from './timestamp.entity';

@Entity('externe')
export class ExterneEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  nom: string;

  @Column({ type: 'varchar' })
  prenom: string;

  @Column({type: 'enum',
  enum: ExterneRoleEnum})
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
  @Column()
  charte: boolean;

  @OneToMany((type) => SortieActifEntity, (sortie) => sortie.responsable, {
    cascade: true,
  })
  responsableAutorisation: SortieActifEntity[];
}
