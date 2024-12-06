import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Simulacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'text' })
  descricao: string;
}
