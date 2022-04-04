import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { UserEntity } from './user.entity';

@Entity('perimetre')
export class PerimetreEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  nom: string;

  @Column({ type: 'varchar' })
  controleAcces: string;

  @Column({ type: 'varchar' })
  mesureSecurite: string;

  @Column({ type: 'varchar' })
  site: string;

  @Column({})
  criticiteCID: number;

  @ManyToOne((type) => UserEntity, (user) => user.perimetre, {
    nullable: true,
    eager: true,
  })
  proprietaire: UserEntity;
}
