
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
    private readonly rUSrvc: RegisterUserCoreService,
  ) { }
  resolve(_route: import('@angular/router').ActivatedRouteSnapshot, _state: import('@angular/router').RouterStateSnapshot) {

    if (_route.paramMap.get('userID')) {
      return this.rUSrvc.getUserFromID(parseInt(_route.paramMap.get('userID') as string, 10)).pipe(tap(_res => {
      }),
                                                                                                   catchError(_e => {
          return of(null)
        })
      )
    }
    throw Error('userID cannot be null')

  }
}
