import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne((type) => UserEntity, (user) => user.agentAutorise, {
    nullable: true,
    eager: true,
  })
  agentS: UserEntity;

  @ManyToOne((type) => UserEntity, (user) => user.responsableAutorisation, {
    nullable: true,
    eager: true,
  })
  responsable: UserEntity;
}
