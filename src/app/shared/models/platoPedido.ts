import { Plato } from './plato';
export class PlatoPedido {
    public plato:Plato
        public cantidad_pedido:number
        public cantidad_lista:number
        public cantidad_servida:number
        public opcionesRapidas:string[]
    constructor(
        

    ){
        this.plato=new Plato(),
        this.cantidad_lista=0
        this.cantidad_pedido=0
        this.cantidad_servida=0
        this.opcionesRapidas=[]
    }
}


