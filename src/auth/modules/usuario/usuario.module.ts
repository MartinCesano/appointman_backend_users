import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { JwtModule } from '../jwt/jwt.module';
import { PermisoModule } from '../permiso/permiso.module';
import { RolModule } from '../rol/rol.module';
import {ClienteModule} from "../../../gestion-reserva-cliente/modules/cliente/cliente.module";
import {EmprendedorModule} from "../../../resources/emprendedor/emprendedor.module";

@Module({
  providers: [UsuarioService],
  controllers: [UsuarioController],
  imports: [JwtModule, PermisoModule, RolModule, ClienteModule, EmprendedorModule],
  exports: [UsuarioService],
})
export class UsuarioModule {}
