export class configuracionCaja{
  public iva:number
  public checkIVA:boolean
  public metodosPago:Array<{nombre:string,porcentaje:number,valor:number,descuentoIncremento:boolean,estado:number}>
  public descuentosIntereses:Array<{nombre:string,porcentaje:number,valor:number,descuentoIncremento:boolean,estado:number}>
  public cierreCaja:number
  constructor(){
    this.iva = 0
    this.metodosPago = []
    this.descuentosIntereses = []
    this.cierreCaja = 0
  }
}

