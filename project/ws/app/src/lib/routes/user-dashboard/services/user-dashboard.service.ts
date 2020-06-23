import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { LoggerService } from '@ws-widget/utils/src/public-api'
import { NsUserDashboard } from '../models/user-dashboard.model'
import { Observable, of, forkJoin } from 'rxjs'
import { switchMap, map, catchError, filter } from 'rxjs/operators'
import { UserAutocompleteService } from '@ws-widget/collection'
// const API_END_POINT = 'user/v1/'

// const headers = new HttpHeaders({
//   'Content-Type': 'application/json',
//   // 'Authorization': this.basic,
//   //wid
//   //root_org
//   //org
//  });
// const options = { headers }
interface IResponse {
  ok: boolean
  error?: string | null,
  DATA?: [NsUserDashboard.IUserListData] ,
  STATUS?: string,
  MESSAGE: string,
}
interface IResponseForGetRoles {
  ok: boolean
  error?: string | null,
  DATA: [] ,
  STATUS?: string,
  MESSAGE?: string,
}
@Injectable({
  providedIn: 'root',
})

export class UserDashboardService {
  detail = {
    endpoint : `/apis/protected/v8/user/details?ts=${Date.now()}`,
  }

  userData: NsUserDashboard.IUserData | any | null
  // detail: any
  // url: any

  constructor(public http: HttpClient,
              private readonly logger: LoggerService,
              private userAutoComplete: UserAutocompleteService) { }

 setUserDashboardConfig(userDataFromConfig: NsUserDashboard.IUserData) {
   this.userData = userDataFromConfig
  }
 async getAllUsers(value: string, headers: NsUserDashboard.IHeaders): Promise<IResponse> {
  const httpOptions = {
    headers: new HttpHeaders({
      rootorg : headers.rootOrg,
      wid_orgadmin: headers.wid_OrgAdmin,
      org: headers.org,
    }),
  }
    this.logger.info('Recieved request for fetching user list')
    try {
           // tslint:disable-next-line: prefer-template
      const userList = await this.http.get<IResponse>('/usersubmission/user/v1/users?filter=' + value , httpOptions).toPromise()
           if (userList && userList.STATUS === 'OK') {
            return Promise.resolve({
              ok: true,
              DATA: userList.DATA,
              MESSAGE: userList.MESSAGE,
            })
           }
            return { ok: false, error: userList.MESSAGE, MESSAGE: userList.MESSAGE }
    } catch (ex) {
          this.logger.error('User List not found')
          this.logger.error(ex)
          if (ex) {
            return Promise.resolve({
              ok: false, error: ex,
              MESSAGE: this.userData.user_list.errorMessage,
            })
          }
          return Promise.resolve({ ok: false, error: null, MESSAGE: this.userData.user_list.errorMessage })
    }
  }

  // tslint:disable-next-line: no-shadowed-variable
  // async acceptUser(responseBody: NsUserDashboard.IAcceptRole, headers: NsUserDashboard.IHeaders): Promise<IResponse> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       // tslint:disable-next-line: object-literal-key-quotes
  //       'rootorg' : headers.rootOrg,
  //       // tslint:disable-next-line: object-literal-key-quotes
  //       'wid_orgadmin': headers.wid_OrgAdmin,
  //       // tslint:disable-next-line: object-literal-key-quotes
  //       'org': headers.org,
  //     }),
  //   }
  //   this.logger.info('Requested roles recieved', responseBody.roles)
  //   const responseBodyAsJSON = {
  //     roles: responseBody.roles ,
  //   user_id: responseBody.user_id,
  // username: responseBody.username}
  //   // const url = '/usersubmission/user/v1/acceptuser'
  //   const url = this.userData.user_accept.url
  //    this.logger.info('Recieved request for accepting user,checking admin role and assigning role to user')
  //    try {
  //     const userAcceptedResponse = await this.http.post<IResponse>(url, responseBodyAsJSON, httpOptions).toPromise()
  //          if (userAcceptedResponse) {
  //           return Promise.resolve({
  //              ok: true,
  //              MESSAGE: this.userData.user_accept.successMessage,
  //            })
  //           }
  //           return { ok: false, error: userAcceptedResponse, MESSAGE: this.userData.user_accept.errorMessage }

  //    } catch (ex) {
  //          this.logger.error('User cannot be accepted')
  //          this.logger.error(ex)
  //          if (ex) {
  //            return Promise.resolve({
  //              ok: false, error: ex,
  //              MESSAGE: this.userData.user_accept.errorMessage,
  //            })
  //          }
  //          return Promise.resolve({ ok: false, error: null, MESSAGE: this.userData.user_accept.errorMessage })
  //    }
  //  }
   async deleteUser(responseBody: NsUserDashboard.IDeclineUser, headers: NsUserDashboard.IHeaders): Promise<IResponse> {

    const httpOptions = {
      headers: new HttpHeaders({
        rootorg : headers.rootOrg,
        wid_orgadmin: headers.wid_OrgAdmin,
        org: headers.org,
      }),
    }

    // tslint:disable-next-line: prefer-template
    // const url = '/usersubmission/user/v1/decline';
    const responseBodyAsJSON = {email: responseBody.email,
  user_id: responseBody.user_Id}

     this.logger.info('Recieved request for decline or delete user ')
     try {
      // tslint:disable-next-line: max-line-length
      const userDeletedResponse = await this.http.post<IResponse>(this.userData.delete_user.url, responseBodyAsJSON, httpOptions).toPromise()
            if (userDeletedResponse) {
             return Promise.resolve({
               ok: true,
               MESSAGE: this.userData.delete_user.successMessage,
             })
            }
            return { ok: false, error: null , MESSAGE: this.userData.delete_user.errorMessage }

     } catch (ex) {
           this.logger.error('User cannot be deleted')
           this.logger.error(ex)
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
          rootorg : root_org,
          // tslint:disable-next-line: object-literal-shorthand
          wid_orgadmin: wid_orgadmin,
          // tslint:disable-next-line: object-literal-shorthand
          org: org,
        }),
      }
      // tslint:disable-next-line: prefer-template
      // const url = '/usersubmission/user/v1/getallRoles';
       this.logger.info('Recieved request for getting all roles')
       try {
        // tslint:disable-next-line: max-line-length
        const getAllRoles = await this.http.get<IResponseForGetRoles>(this.userData.getAllRoles.url, httpOptions).toPromise()
                      if (getAllRoles) {
               return Promise.resolve({
                 ok: true,
                 DATA: getAllRoles.DATA,
               })
              }
              return { ok: false, error: null, MESSAGE: this.userData.getAllRoles.errorMessage , DATA: [] }
       } catch (ex) {
             this.logger.error('User roles cannot be retrieved')
             this.logger.error(ex)
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
   const  responseBodyAsJSON = {
     wid: responseBody.wid,
     roles: responseBody.roles,
   }
   const httpOptions = {
    headers: new HttpHeaders({
      rootorg : headers.rootOrg,
      wid_orgadmin: headers.wid_OrgAdmin,
      org: headers.org,
    }),
  }

      // const url = '/usersubmission/user/v1/changerole';
       this.logger.info('Recieved request for changing role ')
       try {
        // tslint:disable-next-line: max-line-length
        const userDeletedResponse = await this.http.put<IResponse>(this.userData.change_roles.url , responseBodyAsJSON, httpOptions).toPromise()
              if (userDeletedResponse) {
               return Promise.resolve({
                 ok: true,
                 DATA: userDeletedResponse.DATA,
                 MESSAGE: this.userData.change_roles.successMessage,
               })
              }
              return { ok: false, error: null ,  MESSAGE: this.userData.change_roles.errorMessage }
       } catch (ex) {
             this.logger.error('User roles could not be updated')
             this.logger.error(ex)
             if (ex) {
               return Promise.resolve({
                 ok: false, error: ex,
                 MESSAGE: this.userData.change_roles.errorMessage,
               })
             }
             return Promise.resolve({ ok: false, error: null , MESSAGE: this.userData.change_roles.errorMessage })
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
              console.log('did not recieve anything ')
              return of([])
            }
            filterPublishers = () => (source: Observable<any>) => {
              return new Observable(observer => {
                return source.pipe(
                  switchMap((originalData: any) =>  {
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
