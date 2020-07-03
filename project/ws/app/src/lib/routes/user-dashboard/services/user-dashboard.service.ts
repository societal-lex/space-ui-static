import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NsUserDashboard } from '../models/user-dashboard.model'
import { Observable, of, forkJoin } from 'rxjs'
import { switchMap, map, catchError, filter } from 'rxjs/operators'
import { UserAutocompleteService } from '@ws-widget/collection'

interface IResponse {
  ok: boolean
  error?: string | null,
  DATA?: [NsUserDashboard.IUserListData],
  STATUS?: string,
  MESSAGE: string,
}
interface IResponseForGetRoles {
  ok: boolean
  error?: string | null,
  DATA: [],
  STATUS?: string,
  MESSAGE?: string,
}
@Injectable({
  providedIn: 'root',
})

export class UserDashboardService {
  detail = {
    endpoint: `/apis/protected/v8/user/details?ts=${Date.now()}`,
  }

  userData: NsUserDashboard.IUserData | any | null
  // detail: any
  // url: any

  constructor(public http: HttpClient,
              private userAutoComplete: UserAutocompleteService) { }

  setUserDashboardConfig(userDataFromConfig: NsUserDashboard.IUserData) {
    this.userData = userDataFromConfig
  }
  async getAllUsers(value: string, headers: NsUserDashboard.IHeaders): Promise<IResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        rootorg: headers.rootOrg,
        wid_orgadmin: headers.wid_OrgAdmin,
        org: headers.org,
      }),
    }
    try {
      // tslint:disable-next-line: prefer-template
      // tslint:disable-next-line: max-line-length
      const userList = await this.http.get<IResponse>(this.userData.API_END_POINT + this.userData.user_list.url + value, httpOptions).toPromise()
      if (userList && userList.STATUS === 'OK') {
        return Promise.resolve({
          ok: true,
          DATA: userList.DATA,
          MESSAGE: userList.MESSAGE,
        })
      }
      return { ok: false, error: userList.MESSAGE, MESSAGE: userList.MESSAGE }
    } catch (ex) {
      if (ex) {
        return Promise.resolve({
          ok: false, error: ex,
          MESSAGE: this.userData.user_list.errorMessage,
        })
      }
      return Promise.resolve({ ok: false, error: null, MESSAGE: this.userData.user_list.errorMessage })
    }
  }

  async deleteUser(responseBody: NsUserDashboard.IDeclineUser, headers: NsUserDashboard.IHeaders): Promise<IResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        rootorg: headers.rootOrg,
        wid_orgadmin: headers.wid_OrgAdmin,
        org: headers.org,
      }),
    }

    // tslint:disable-next-line: prefer-template
    const responseBodyAsJSON = {
      email: responseBody.email,
      user_id: responseBody.user_Id,
    }
    try {
      // tslint:disable-next-line: max-line-length
      const userDeletedResponse = await this.http.post<IResponse>(this.userData.API_END_POINT + this.userData.delete_user.url, responseBodyAsJSON, httpOptions).toPromise()
      if (userDeletedResponse && userDeletedResponse.STATUS === 'OK') {
        return Promise.resolve({
          ok: true,
          MESSAGE: this.userData.delete_user.successMessage,
        })
      }
      return { ok: false, error: null, MESSAGE: this.userData.delete_user.errorMessage }

    } catch (ex) {
      if (ex) {
        return Promise.resolve({
          ok: false, error: ex,
          MESSAGE: this.userData.delete_user.errorMessage,
        })
      }
      return Promise.resolve({ ok: false, error: null, MESSAGE: this.userData.delete_user.errorMessage })
    }
  }

  // tslint:disable-next-line: variable-name
  async getAllRoles(root_org: string, wid_orgadmin: string, org: string): Promise<IResponseForGetRoles> {
    const httpOptions = {
      headers: new HttpHeaders({
        rootorg: root_org,
        // tslint:disable-next-line: object-literal-shorthand
        wid_orgadmin: wid_orgadmin,
        // tslint:disable-next-line: object-literal-shorthand
        org: org,
      }),
    }
    // tslint:disable-next-line: prefer-template
    // const url = '/usersubmission/user/v1/getallRoles';
    try {
      // tslint:disable-next-line: max-line-length
      const getAllRoles = await this.http.get<IResponseForGetRoles>(this.userData.API_END_POINT + this.userData.getAllRoles.url, httpOptions).toPromise()
      if (getAllRoles) {
        return Promise.resolve({
          ok: true,
          DATA: getAllRoles.DATA,
        })
      }
      return { ok: false, error: null, MESSAGE: this.userData.getAllRoles.errorMessage, DATA: [] }
    } catch (ex) {
      if (ex) {
        return Promise.resolve({
          ok: false, error: ex,
          DATA: [],

        })
      }
      return Promise.resolve({ ok: false, error: null, DATA: [] })
    }
  }
  async changeRoles(responseBody: NsUserDashboard.IChangeRole, headers: NsUserDashboard.IHeaders): Promise<IResponse> {
    // tslint:disable-next-line: prefer-template
    const responseBodyAsJSON = {
      wid: responseBody.wid,
      roles: responseBody.roles,
    }
    const httpOptions = {
      headers: new HttpHeaders({
        rootorg: headers.rootOrg,
        wid_orgadmin: headers.wid_OrgAdmin,
        org: headers.org,
      }),
    }

    // const url = '/usersubmission/user/v1/changerole';
    try {
      // tslint:disable-next-line: max-line-length
      const userChangedRoleResponse = await this.http.put<IResponse>(this.userData.API_END_POINT + this.userData.change_roles.url, responseBodyAsJSON, httpOptions).toPromise()
      if (userChangedRoleResponse && userChangedRoleResponse.STATUS === 'OK') {
        return Promise.resolve({
          ok: true,
          DATA: userChangedRoleResponse.DATA,
          MESSAGE: this.userData.change_roles.successMessage,
        })
      }
      return { ok: false, error: null, MESSAGE: this.userData.change_roles.errorMessage }
    } catch (ex) {
      if (ex) {
        return Promise.resolve({
          ok: false, error: ex,
          MESSAGE: this.userData.change_roles.errorMessage,
        })
      }
      return Promise.resolve({ ok: false, error: null, MESSAGE: this.userData.change_roles.errorMessage })
    }
  }
  generateDetailsRequests(originalData: object[]) {
    if (originalData.length) {
      return originalData.map((user: any) => {
        const headers = new HttpHeaders({
          wid: user.wid,
        })
        return this.http.get<any>(this.detail.endpoint, {
          headers,
        }).pipe(map((httpRes: object) => {
          return {
            ...httpRes,
            wid: user.wid,
            email: user.email,
          }
        }))
      })
    }
    // tslint:disable-next-line: no-console
    return of([])
  }
  filterPublishers = () => (source: Observable<any>) => {
    return new Observable(observer => {
      return source.pipe(
        switchMap((originalData: any) => {
          const roleRequests = this.generateDetailsRequests(originalData)
          return forkJoin(roleRequests).pipe(
            map((rolesResponse: object[]) => {
              return rolesResponse.filter((roleObj: any) => {
                return roleObj.hasOwnProperty('roles') && Array.isArray(roleObj.roles)
              })
            })
          )
        })
      ).subscribe({
        next(data) {
          observer.next([...data])
        },
        error(e) {
          observer.error(e)
        },
        complete() {
          observer.complete()
        },
      })
    })
  }
  parseDetailsOfPublishers(combinedDetails: any[]) {
    const allUsers = combinedDetails[0]
    const publisherRoleUsers = combinedDetails[1]
    return publisherRoleUsers.map((publisher: any) => {
      const foundUser = allUsers.find((user: any) => user.wid === publisher.wid)
      if (foundUser) {
        return {
          displayName: `${foundUser.first_name || ''} ${foundUser.last_name || ''}`,
          id: foundUser.wid,
          mail: foundUser.email,
          roles: publisherRoleUsers[0].roles,

        }
      } return null
    })
  }
  fetchPublishersList(data: string): Observable<any> {
    const allMatchingUsers$ = this.userAutoComplete.fetchAutoComplete(data)
    const filteredPublishersDetails$ = allMatchingUsers$.pipe(
      this.filterPublishers(),

      catchError(

        _ => {
          return of([])
        })
    )
    const finalPublishers$ = forkJoin([allMatchingUsers$, filteredPublishersDetails$]).pipe(
      map((combinedDetails: any[]) => {
        return this.parseDetailsOfPublishers(combinedDetails)
      }),
      filter((finalData: object[]) => finalData !== null)
    )
    return finalPublishers$
  }
}
