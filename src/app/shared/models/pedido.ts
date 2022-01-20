import { PlatoPedido } from './platoPedido';
export class Pedido {
  public _id:string
  public id_mesa:string
  public observacion:string
  public horaDeEnvio:Date
  public horaDeEntrega:Date
  public pedidos:PlatoPedido[]
  public estado:number
  public createdAt:Date
    constructor(


    ){
      this._id = ""
      this.id_mesa = ""
      this.observacion = ""
      this.horaDeEnvio = new Date
      this.horaDeEntrega = new Date
      this.pedidos = []
      this.estado = 0
      this.createdAt = new Date
    }
}
