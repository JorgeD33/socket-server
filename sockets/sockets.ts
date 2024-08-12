import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectarCliente =  (cliente: Socket) => {

    cliente.on('disconnect', ()=> {
        console.log('Cliente desconectado');
    });

}

//escuchar mensaje
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {

        io.emit('mensaje-nuevo', payload);
        console.log('mensaje recibido', payload)

    })
}