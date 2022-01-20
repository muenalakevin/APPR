import { Usuario } from 'src/app/shared/models/usuario';
import { Caja } from './caja';
export class Egreso{
    public _id:string
    public caja:string
    public id_cajero:string
    public nombre_egreso:string
    public detalle_egreso:string
    public observacion_egreso:string
    public cantidad_egreso:number
    public estado:number
    public createdAt:Date
    constructor(){
        this._id = ""
        this.caja = ""
        this.nombre_egreso = ""
        this.detalle_egreso = ""
        this.observacion_egreso = ""
        this.cantidad_egreso = 0
        this.estado = 0
        this.createdAt = new Date()
    }
}
