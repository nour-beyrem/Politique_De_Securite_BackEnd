/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ActifEntity } from './actif.entity';
import { ExterneEntity } from './externe.entity';
import { TimestampEntity } from './timestamp.entity';
import { UserEntity } from './user.entity';

@Entity('sortie')
export class SortieActifEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  ref: string;

  @Column({ type: 'varchar' })
  naturePanne: string;

  @Column({})
  Date: Date;

  @Column({})
  dateSortie: Date;

  @Column({})
  dateRestitution: Date;

  @Column({ type: 'varchar' })
  etatGeneral: string;

  @Column({ type: 'varchar' })
  observation: string;

  @ManyToOne((type) => ActifEntity, (actif) => actif.sortie, {
    nullable: true,
    eager: true,
  })
  actifS: ActifEntity;
  
  @ManyToOne((type) => UserEntity, (user) => user.agentAutorise, {
    nullable: true,
    eager: true,
  })
  agentS: UserEntity;

  @ManyToOne((type) => ExterneEntity, (user) => user.responsableAutorisation, {
    nullable: true,
    eager: true,
  })
  responsable: ExterneEntity;
}
