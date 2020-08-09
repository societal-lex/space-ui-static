
import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { RegisterUserCoreService } from '../routes/public/register-user/services/register-user-core.service'
import { tap, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserDetailResolverService implements Resolve<any> {
  constructor(
    private readonly RUSrvc: RegisterUserCoreService,
  ) { }
  resolve(_route: import('@angular/router').ActivatedRouteSnapshot, _state: import('@angular/router').RouterStateSnapshot) {
    console.log('route', _route)
    console.log('state', _state)
    if (_route.paramMap.get('userID')) {
      return this.RUSrvc.getUserFromID(parseInt(_route.paramMap.get('userID') as string)).pipe(tap(res => {
        console.log('detected data ', res)
      }),
                                                                                               catchError(_e => {
          return of(null)
        })
      )
    } 
      throw Error('userID cannot be null')
    

  }
}
