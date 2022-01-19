export class configuracionEstilo{
    public colorAplicacion:{check:boolean,color:string}
    public colorSatisfaccion:{check:boolean,color:string}
    public colorSatisfaccionMedia:{check:boolean,color:string}
    public colorDisatisfaccion:{check:boolean,color:string}
    public colorFueraTiempo:{check:boolean,color:string}
    public colorOcupada:{check:boolean,color:string}
    public colorDisponible:{check:boolean,color:string}
    constructor(){
      this.colorAplicacion = {check:false,color: ""}
      this.colorSatisfaccion = {check:false,color: ""}
      this.colorSatisfaccionMedia = {check:false,color: ""}
      this.colorDisatisfaccion = {check:false,color: ""}
      this.colorFueraTiempo = {check:false,color: ""}
      this.colorOcupada = {check:false,color: ""}
      this.colorDisponible = {check:false,color: ""}
    }
  }
  
  