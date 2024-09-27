import { Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';

@Injectable()
export class HorarioService {
  repository = Horario;

  async create(createHorarioDto: CreateHorarioDto): Promise<Horario> {
    let horario = new Horario();
    horario.name = createHorarioDto.name;
    horario.horas = createHorarioDto.horas;

    return await this.repository.save(horario);
  }

  async findAll(): Promise<Horario[]> {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateHorarioDto: UpdateHorarioDto): Promise<Horario> {
    let horario = await this.repository.findOne({ where: { id }, relations: ['horas'] });

    if (!horario) {
      throw new Error(`Horario with id ${id} not found`);
    }

    Object.assign(horario, updateHorarioDto);

    if (updateHorarioDto.horas) {
      horario.horas = horario.horas.filter(h =>
        updateHorarioDto.horas.some(dtoH => dtoH.id === h.id)
      );

      for (const dtoH of updateHorarioDto.horas) {
        const existingH = horario.horas.find(h => h.id === dtoH.id);
        if (existingH) {
          Object.assign(existingH, dtoH);
        } else {
          horario.horas.push(dtoH);
        }
      }
    }

    await this.repository.save(horario);

    return horario;
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
