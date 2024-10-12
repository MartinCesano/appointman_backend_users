import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Turno } from '../turno/turno.entity'; 
import { Horario } from 'src/gestion-empresa/modules/horario/horario.entity';
import { IHora } from 'src/gestion-reserva-cliente/interfaces/hora.interface';
import { IHorario } from 'src/gestion-reserva-cliente/interfaces/horario.interface';
import { ITurno } from 'src/gestion-reserva-cliente/interfaces/turno.interface';

@Entity()
export class Hora extends BaseEntity implements IHora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  horaInicio: string;
  
  @Column()
  horaFin: string;

  @ManyToMany(() => Horario, horario => horario.horas)
  @JoinTable()
  horarios: IHorario[];

  @OneToMany(() => Turno, turno => turno.hora) 
  turnos: ITurno[]; 
}
