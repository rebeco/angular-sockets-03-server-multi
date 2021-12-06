import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';

export const usuariosConectados: UsuariosLista = new UsuariosLista();

// Desconectar cliente

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('disconnect', () => {
    usuariosConectados.borrarUsuario(cliente.id);
    io.emit('usuarios-activos', usuariosConectados.getLista());

    console.log('Cliente desconectado');
  });
};

// Conectar cliente

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
  const usuario = {
    id: cliente.id,
  };
  usuariosConectados.agregar(usuario);
  io.emit('usuarios-activos', usuariosConectados.getLista());
};

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('mensaje', (payload: object) => {
    console.log('Mensaje recibido: ', payload);
    io.emit('mensaje-nuevo', payload);
  });
};

// Configurar usuario
export const usuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on(
    'configurar-usuario',
    (payload: { nombre: string }, callback: Function) => {
      usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
      callback({
        ok: true,
        id: cliente.id,
        mensaje: `Usuario ${payload.nombre} configurado correctamente`,
      });
      io.emit('usuarios-activos', usuariosConectados.getLista());
    }
  );
};

// Obtener usuario
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('obtener-usuarios', () => {
    io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
  });
};
