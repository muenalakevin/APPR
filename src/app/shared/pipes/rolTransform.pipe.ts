import { Rol } from './../models/rol';
import { RolService } from './../../core/services/rol.service';
import { Pipe, PipeTransform, OnInit } from '@angular/core';

@Pipe({
  name: 'rolTransform'
})
export class RolTransformPipe implements PipeTransform, OnInit {
constructor(private RolService:RolService){

}

  transform(value: any, args?: any): any {
    //console.log(this.roles);
    const result = this.roles.filter(rol=>{rol._id==value})
    //console.log(result);
    return result;
  }
  roles: Rol[] = []
  ngOnInit(){
    this.RolService.getRols()
      .subscribe( data => {
        //console.log(data);
        this.roles = <Rol[]>data;
      });
  }
}
