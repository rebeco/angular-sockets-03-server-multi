import { Usuario } from './usuario';
export class UsuariosLista {
  private lista: Usuario[] = [];

  constructor() {}

  agregar(usuario: Usuario) {
    this.lista.push(usuario);
    return usuario;
  }

  actualizarNombre(id: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }
    console.log(`Usuario ${id} actualizado...`);
    console.log(this.lista);
  }

  getLista() {
    return this.lista.filter((usuario) => usuario.nombre !== '');
  }

  getUsuario(id: string) {
    return this.lista.find((usuario) => {
      return usuario.id === id;
    });
  }

  getUsuariosEnSala(sala: string) {
    return this.lista.filter((usuario) => {
      return usuario.sala === sala;
    });
  }

  borrarUsuario(id: string) {
    const tempUsuario = this.getUsuario(id);
    this.lista = this.lista.filter((usuario) => {
      return usuario.id !== id;
    });
    return tempUsuario;
  }
}
