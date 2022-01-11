export class metodoPago{
  public nombre:string
  public porcentaje:number
  public valor:number
  public descuentoIncremento:boolean
  public estado:number
  constructor(){
    this.nombre = ""
    this.porcentaje = 0
    this.valor = 0
    this.descuentoIncremento = false
    this.estado =1
  }
}
