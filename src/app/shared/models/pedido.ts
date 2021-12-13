import { Plato } from './plato';
export class Pedido {
    constructor(

        public id_mesa:string,
        public pedidos:
        { plato:Plato,
        cantidad_pedido:number}[]
    ){}
}
