export class Cliente{
    public _id:string
    public nombre_cliente:string
    public apellido_cliente:string
    public cedRuc_cliente:string
    public correo_cliente:string
    public direccion_cliente:string
    public telefono_cliente:string
    public createdAt:Date
    constructor(){
        this._id = ""
        this.nombre_cliente = ""
        this.apellido_cliente = ""
        this.cedRuc_cliente = ""
        this.correo_cliente = ""
        this.direccion_cliente = ""
        this.telefono_cliente = ""
        this.createdAt = new Date()
    }
}
