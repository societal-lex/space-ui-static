import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { RegisterUserCoreService } from '../routes/public/register-user/services/register-user-core.service'

@Injectable({
  providedIn: 'root'
})
export class RegisterUserReolverService implements Resolve<any>{
  constructor(
    private readonly RUSrvc: RegisterUserCoreService,
  ) { }
  resolve(_route: import("@angular/router").ActivatedRouteSnapshot, _state: import("@angular/router").RouterStateSnapshot) {
    return this.RUSrvc.getUsersDetails()
  }
}
