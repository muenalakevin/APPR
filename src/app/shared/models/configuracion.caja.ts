export class configuracionCaja{
  public iva:number
  public checkIVA:boolean
  public metodosPago:Array<{nombre:string,porcentaje:number,valor:number,descuentoIncremento:boolean,estado:number}>
  public descuentosIntereses:Array<{nombre:string,porcentaje:number,valor:number,descuentoIncremento:boolean,estado:number}>
  public cierreCaja:number
  public colorFlechas:{check:boolean,color:string}
  public colorAgregarCliente:{check:boolean,color:string}
  public colorEditarCliente:{check:boolean,color:string}
  public colorPagar:{check:boolean,color:string}
  constructor(){
    this.iva = 0
    this.metodosPago = []
    this.descuentosIntereses = []
    this.cierreCaja = 0
    this.colorFlechas = {check:false,color: ""}
    this.colorAgregarCliente = {check:false,color: ""}
    this.colorEditarCliente = {check:false,color: ""}
    this.colorPagar = {check:false,color: ""}
  }
}

