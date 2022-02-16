import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { UserEntity } from './user.entity';

@Entity('actif')
export class ActifEntity extends TimestampEntity {
  @PrimaryColumn({
    length: 50,
    unique: true,
  })
  reference: string;

  @Column({ type: 'varchar' })
  nom: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  adresseIP: string;

  @Column({ type: 'varchar' })
  localisation: string;

  @Column({ type: 'varchar' })
  genre: string;

  @Column({ type: 'varchar' })
  serveurApplication: string;

  @Column({ type: 'varchar' })
  bd: string;

  @Column({ type: 'varchar' })
  os: string;

  @Column({ type: 'varchar' })
  dmia: string;

  @Column({})
  criticiteCID: number;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  proprietaire: UserEntity[];
}
