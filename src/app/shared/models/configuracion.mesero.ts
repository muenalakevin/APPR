export class configuracionMesero{
  public satisfaccionAdecuada:number
  public satisfaccionMedia:number
  public disatisfaccion:number
  public colorSatisfaccion:{check:boolean,color:string}
  public colorSatisfaccionMedia:{check:boolean,color:string}
  public colorDisatisfaccion:{check:boolean,color:string}
  public colorFueraTiempo:{check:boolean,color:string}
  public colorOcupada:{check:boolean,color:string}
  public colorDisponible:{check:boolean,color:string}
  public meseroEdit:boolean
  constructor(){
    this.satisfaccionAdecuada = 0
    this.satisfaccionMedia = 0
    this.disatisfaccion = 0
    this.colorSatisfaccion = {check:false,color: ""}
    this.colorSatisfaccionMedia = {check:false,color: ""}
    this.colorDisatisfaccion = {check:false,color: ""}
    this.colorFueraTiempo = {check:false,color: ""}
    this.colorOcupada = {check:false,color: ""}
    this.colorDisponible = {check:false,color: ""}
    this.meseroEdit = false
  }
}

