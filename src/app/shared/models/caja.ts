import { Usuario } from 'src/app/shared/models/usuario';
export class Caja{
    public _id:string
    public id_cajero:string
    public caja_chica:number
    public cantidad_egreso:number
    public cantidad_ingreso:number
    public cantidad_descuentos:number
    public estado:number
    public createdAt:Date
    constructor(){
        this._id = ""
        this.id_cajero = ""
        this.caja_chica = 0
        this.cantidad_egreso = 0
        this.cantidad_ingreso = 0
        this.cantidad_descuentos = 0
        this.estado = 0
        this.createdAt = new Date()
    }
}
