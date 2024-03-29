/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserRoleEnum } from 'src/user/enum/user-role.enum';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ActifEntity } from './actif.entity';
import { CelluleEntity } from './cellule.entity';
import { DemandeAutorisationEntity } from './demande-autorisation.entity';
import { PerimetreEntity } from './perimetre.entity';
import { SortieActifEntity } from './sortie-actif.entity';
import { TimestampEntity } from './timestamp.entity';

@Entity('user')
export class UserEntity extends TimestampEntity {
  @PrimaryColumn({
    length: 50,
    unique: true,
  })
  username: string;

  @Column({ type: 'varchar', length: 50 })
  prenom: string;
  @Column({ type: 'varchar', length: 50 })
  nom: string;
  @Column({ type: 'varchar', nullable: true })
  sexe: string;
  @Column({ type: 'varchar', nullable: true })
  adresse: string;
  @Column({})
  cin: number;

  @Column({})
  age: number;
  @Column({ type: 'varchar' })
  direction: string;

  @Column({ type: 'varchar' })
  site: string;

  @Column()
  sortie: boolean;
  @Column()
  dateSortie: Date;

  @Column({type: 'enum',
        enum: UserRoleEnum})
       role: string;
  @Column()
  charte: boolean;
  @Column()
  teletravail: boolean;

  @Column({
    length: 50,
    unique: true,
  })
  matricule: string;
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  salt: string;

  @OneToMany(
    (type) => DemandeAutorisationEntity,
    (autorisation) => autorisation.user,
    {
      cascade: true,
    },
  )
  autorisationUser: DemandeAutorisationEntity[];

  @OneToMany(
    (type) => DemandeAutorisationEntity,
    (autorisation) => autorisation.user,
    {
      cascade: true,
    },
  )
  autorisationResponsable: DemandeAutorisationEntity[];

  @OneToMany((type) => PerimetreEntity, (perimetre) => perimetre.proprietaire, {
    cascade: true,
  })
  perimetre: PerimetreEntity[];

  @OneToMany((type) => SortieActifEntity, (sortie) => sortie.agentS, {
    cascade: true,
  })
  agentAutorise: SortieActifEntity[];




  @OneToMany((type) => ActifEntity, (actif) => actif.proprietaire, {
    cascade: true,
  })
  actif: ActifEntity[];

  @OneToMany((type) => CelluleEntity, (cellule) => cellule.president, {
    cascade: true,
  })
  presidentC: CelluleEntity[];

  @OneToMany((type) => CelluleEntity, (cellule) => cellule.membre1, {
    cascade: true,
  })
  membre1C: CelluleEntity[];

  @OneToMany((type) => CelluleEntity, (cellule) => cellule.membre2, {
    cascade: true,
  })
  membre2C: CelluleEntity[];
}
