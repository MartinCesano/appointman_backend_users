import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Empresa } from "../empresa/empresa.entity";
import { ISucursal } from "src/gestion-empresa/interfaces/sucursal.interface";
import { IEmpresa } from "src/gestion-empresa/interfaces/empresa.interface";
import { Servicio } from "../servicio/servicio.entity";

@Entity("sucursal")
export class Sucursal extends BaseEntity implements ISucursal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    domicilio: string;


    @Column()
    telefono?: string;

    @Column()
    email?: string;

    @ManyToOne(() => Empresa, empresa => empresa.sucursales)
    empresa: IEmpresa;

    @ManyToMany(() => Servicio, servicio => servicio.sucursales)
    @JoinTable()
    servicios: Servicio[];

}