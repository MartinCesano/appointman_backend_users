import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClienteEntity} from "./entities/cliente.entity";
import {UsuarioModule} from "../../auth/modules/usuario/usuario.module";
import {UsuarioService} from "../../auth/modules/usuario/usuario.service";

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
  imports: [TypeOrmModule.forFeature([ClienteEntity]), UsuarioModule]
})
export class ClienteModule {}
