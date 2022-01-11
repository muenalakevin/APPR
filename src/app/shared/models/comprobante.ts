import { PlatoPedido } from './platoPedido';
import { Pedido } from './pedido';
import { Cliente } from './cliente';
import { Caja } from './caja';
export class Comprobante{
    public _id:string
    public caja:Caja
    public pedido_comprobante:Pedido
    public cliente_comprobante:Cliente
    public fecha_comprobante:Date
    public total_comprobante:number
    public iva_comprobante:number
    public pago_comprobante:string
    public detalle_comprobante:PlatoPedido[]
    constructor(){
        this._id = ""
        this.pedido_comprobante= new Pedido()
        this.cliente_comprobante = new Cliente()
        this.fecha_comprobante = new Date()
        this.total_comprobante = 0
        this.iva_comprobante = 0
        this.pago_comprobante = ""
        this.detalle_comprobante = []
    }
}
