import { PlatoPedido } from './platoPedido';
export class Pedido {
  public id_mesa:string
  public observacion:string
  public horaDeEnvio:Date
  public horaDeEntrega:Date
  public pedidos:PlatoPedido[]
    constructor(


    ){
      this.id_mesa = ""
      this.observacion = ""
      this.horaDeEnvio = new Date
      this.horaDeEntrega = new Date
      this.pedidos = []
    }
}
