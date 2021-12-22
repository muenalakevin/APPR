import { Plato } from './plato';
export class Pedido {
    constructor(

        public id_mesa:string,
        public observacion:string,
        public horaDeEnvio:Date,
        public horaDeEntrega:Date,
        public pedidos:
        { plato:Plato,
        cantidad_pedido:number,
        cantidad_lista:number,
        cantidad_servida:number,
    }[]
    ){}
}
