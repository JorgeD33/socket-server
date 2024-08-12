import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server{
    private static _intance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer = http.createServer();

     private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );
        this.escucharSockets();
    }

    public static get intance(){

        return this._intance || (this._intance = new this());
    }

    private escucharSockets(){
        console.log('Sockets')

        this.io.on('connection',cliente => {
            console.log('nuevo cliente conectado')


            //desconectar
            socket.desconectarCliente(cliente);
            
            //mensajes
            socket.mensaje(cliente, this.io)
        });

        
    }



    inicio(callback: any){
        this.httpServer.listen(this.port, callback);
    }
}