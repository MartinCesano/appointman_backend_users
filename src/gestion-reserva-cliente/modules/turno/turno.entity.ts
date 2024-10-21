import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Hora } from '../hora/hora.entity'; // Asegúrate de que esta ruta sea correcta
import { ITurno } from '../../interfaces/turno.interface';
import { Disponibilidad } from '../../../gestion-empresa/modules/disponibilidad/disponibilidad.entity';
import { IDisponibilidad } from '../../../gestion-empresa/interfaces/disponibilidad.interface';
import { IHora } from '../../interfaces/hora.interface';
import { Exclude } from 'class-transformer';
import { IReserva } from '../../interfaces/reserva.interface';
import { Reserva } from '../reserva/entities/reserva.entity';

@Entity() // Agregar el decorador @Entity
export class Turno extends BaseEntity implements ITurno{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hora, hora => hora.turnos)
  hora: IHora;

  @ManyToOne(() => Disponibilidad, disponibilidad => disponibilidad.turnos)
  @Exclude()
  disponibilidad: IDisponibilidad;

  @ManyToOne(() => Reserva, reserva => reserva.turnos)
  @Exclude()
  reserva: IReserva;
  
}
