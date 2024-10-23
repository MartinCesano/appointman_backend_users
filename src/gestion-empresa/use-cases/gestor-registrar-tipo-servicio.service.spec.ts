import { Test, TestingModule } from '@nestjs/testing';
import { GestorRegistrarTipoServicioService } from './gestor-registrar-tipo-servicio.service';
import { ServicioService } from '../modules/servicio/servicio.service';
import { UsuarioService } from '../../auth/modules/usuario/usuario.service';
import { RegistrarTipoServicioDTO } from '../interfaces/registrarTipoServicio';

describe('GestorRegistrarTipoServicioService', () => {
  let service: GestorRegistrarTipoServicioService;
  let servicioService: ServicioService;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GestorRegistrarTipoServicioService,
        {
          provide: ServicioService,
          useValue: {
            create: jest.fn().mockResolvedValue({  // Mock para el método create
              nombre: 'Corte de Pelo',
              duracion: 40,
              precio: 8000,
              empresa: { id: 1, nombre: 'Empresa Test' }
            }),
          },
        },
        {
          provide: UsuarioService,
          useValue: {
            getEmpresa: jest.fn(),
            buscarPorEmail: jest.fn().mockResolvedValue({
              id: 1,
              email: "martingaido@gmail.com",
              empresa: { id: 1, nombre: 'Empresa Test' },
            }),
          },
        },
      ],
    }).compile();

    service = module.get<GestorRegistrarTipoServicioService>(GestorRegistrarTipoServicioService);
    servicioService = module.get<ServicioService>(ServicioService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería devolver el servicio asociado a la empresa', async () => {
    const dto: RegistrarTipoServicioDTO = { nombre: 'Corte de Pelo', duracion: 40, precio: 4000, idEmpresa: 1 };
    const usuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");

    const result = await service.registrarTipoServicio(dto, usuario);

    // Comprobar que el resultado tiene las propiedades esperadas
    expect(result).toHaveProperty('nombre', 'Corte de Pelo');
    expect(result).toHaveProperty('duracion', 40);
    expect(result).toHaveProperty('precio', 8000);
    expect(result).toHaveProperty('empresa');
  });

  it('debería devolver error porque la duracion no es multiplo de 5', async () => {
    const dto: RegistrarTipoServicioDTO = { nombre: 'Tintura', duracion: 62, precio: 8000, idEmpresa: 1 };
    const usuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");

    const result = await service.registrarTipoServicio(dto, usuario);

    // Comprobar que el resultado tiene las propiedades esperadas
    expect(result).toEqual({ error: 'La duracion debe ser mayor a 0 y multiplo de 5' });
  });

  it('debería devolver error porque la duracion es 0', async () => {
    const dto: RegistrarTipoServicioDTO = { nombre: 'Nutricion', duracion: 0, precio: 8000, idEmpresa: 1 };
    const usuario = await usuarioService.buscarPorEmail("martingaido@gmail.com");

    const result = await service.registrarTipoServicio(dto, usuario);

    // Comprobar que el resultado tiene las propiedades esperadas
    expect(result).toEqual({ error: 'La duracion debe ser mayor a 0 y multiplo de 5' });
  });

  

});
