import { PlatoPedido } from './platoPedido';
import { Pedido } from './pedido';
import { Cliente } from './cliente';
import { Caja } from './caja';
import { metodoPago } from './metodoPago';
export class Comprobante{
    public _id:string
    public caja_comprobante?:string
    public pedido_comprobante?:string
    public cliente_comprobante:string
    public fecha_comprobante:Date
    public iva_comprobante:number
    public subTotal_comprobante:number
    public subTotalConDescunto_comprobante:number
    public subTotalIva_comprobante:number
    public descuento_comprobante:number
    public interes_comprobante:number
    public total_comprobante:number
    public metodoPago_comprobante:metodoPago
    public descuentoInteres_comprobante:metodoPago
    public detalle_comprobante?:PlatoPedido[]
    constructor(){
        this._id = ""
        this.caja_comprobante = ""
        this.pedido_comprobante= ""
        this.cliente_comprobante = ""
        this.fecha_comprobante = new Date()
        this.total_comprobante = 0
        this.iva_comprobante = 0
        this.detalle_comprobante = []
        this.subTotal_comprobante = 0
        this.subTotalConDescunto_comprobante = 0
        this.subTotalIva_comprobante= 0
        this.descuento_comprobante = 0
        this.interes_comprobante = 0
        this.total_comprobante = 0
        this.metodoPago_comprobante = new metodoPago()
        this.descuentoInteres_comprobante = new metodoPago()
    }
}
