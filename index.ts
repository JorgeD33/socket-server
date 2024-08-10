import Server from "./classes/server";
import { SERVER_PORT } from "./global/enviroment";
import { router } from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";

const server =  new Server();
//Bparser

server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Cors
server.app.use(cors({
    origin: true,
    credentials: true
}));

//Rutas
server.app.use('/', router);

server.inicio(() => {
    console.log('conectado al servidor puerto')
    console.log(SERVER_PORT)
})