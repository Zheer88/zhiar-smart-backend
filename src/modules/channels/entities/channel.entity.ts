import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('channels')
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  streamUrl: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: true })
  isActive: boolean;
}
