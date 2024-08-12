import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuarioLista;

export const conectarCliente = (cliente: Socket) =>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario)
}


export const desconectarCliente =  (cliente: Socket) => {

    cliente.on('disconnect', ()=> {
        console.log('Cliente desconectado');
        const usuario = new Usuario(cliente.id);
        usuariosConectados.borrarUsuario(usuario.id)

    });

}

//escuchar mensaje
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {

        io.emit('mensaje-nuevo', payload);
        console.log('mensaje recibido', payload)

    });
    
}

export const conexionUsuario = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: any) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre)
       // io.emit('configurar-usuario', payload);
        console.log('Usuario conectado: ', payload)
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre} conectado`
        })

    }); 
}  