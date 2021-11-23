import { Rol } from './rol';
export class Token {
    constructor(
        public _id: String,
        public nombre_usuario: String,
        public usuario_usuario: String,
        public correo_usuario: String,
        public rol: Rol,
        ){}
}

