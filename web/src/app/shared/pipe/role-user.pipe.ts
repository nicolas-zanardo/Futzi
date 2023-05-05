import { Pipe, PipeTransform } from '@angular/core';
import {ROLE, SetROLE} from "../enum/role";

@Pipe({
  name: 'roleUser'
})
export class RoleUserPipe implements PipeTransform {

  transform(value: string): string {


    switch (value) {
      case SetROLE.MEMBRE:
        return "MEMBRE";
        break;
      case SetROLE.DEMANDE:
        return "DEMANDE";
        break;
      case SetROLE.BANNI:
        return "BANNI";
        break;
      default:
        return "SUPRIMER"

    }
  }

}
