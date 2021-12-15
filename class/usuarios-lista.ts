import { Usuario } from "./usuario";


export class UsuariosLista {

  private lista: Usuario[] = [];

  constructor() { }

  // Agregar usuario
  public agregar(usuario: Usuario) {
    this.lista.push(usuario);
    return usuario;
  }

  // Actualiza nombre de usuario
  public actualizarNombre(id: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }
    // console.log('Actualizando nombre de usuario');
    console.log(this.lista);
  }

  // Obtener lista de usuarios
  public getLista() {
    return this.lista;
  }

  // Obtener usuario
  public getUsuario(id: string) {
    return this.lista.find(usuario => usuario.id === id);
  }

  // Obtener usuario en sala en particular
  public getUsuariosEnSala(sala: string) {
    return this.lista.filter(usuario => usuario.sala === sala);
  }

  // Borrar usuario
  public borrarUsuario(id: string) {
    const tempUsuario = this.getUsuario(id);
    this.lista = this.lista.filter(usuario => usuario.id !== id);
    // console.log(this.lista);
    return tempUsuario;
  }
}