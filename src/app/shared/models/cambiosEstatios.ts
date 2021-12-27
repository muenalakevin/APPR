import { PlatoPedido } from './platoPedido';

export class CambioEstatico {
    constructor(
        public _id:string,
        public pedidos:PlatoPedido[],
        public cambio:boolean
    ){}
}
