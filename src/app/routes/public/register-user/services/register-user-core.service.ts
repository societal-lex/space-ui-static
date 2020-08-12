import { Injectable } from '@angular/core'
// import { HttpClient } from '@angular/common/http'
import { IRegisterUserModel, IRegsiterDetailObject } from './register-user-core.model'
import { Observable, of } from 'rxjs'
// import { HttpClient } from '@angular/common/http'
// import { catchError, tap } from 'rxjs/operators'

// const GETURL = ''
// const GET_ID_URL = ''
@Injectable({
  providedIn: 'root',
})
export class RegisterUserCoreService {

  // constructor(private readonly http: HttpClient) { }
  constructor() { }

  userData: IRegisterUserModel = {
    details: [
      {
        source_id: 1234,
        username: 'Sumit Nautiyal',
        first_name: 'Sumit',
        last_name: 'Nautiyal',
        middle_name: '',
        residence_country: 'India',
        gender: 'Male',
        email: 'sumit.nautiyal@ilimi.in',
        contact_phone_number_personal: '8908765671',
        residence_city: 'Delhi',
        employment_status: 'Achievement',
        department_name: 'Bird Watching',
        time_updated: '7 Aug 2020',
        images: 'src/My_Gallery.png',
      },
      {
        source_id: 100,
        username: 'Tanya Chauhan',
        first_name: 'Tanya',
        last_name: 'Chauhan',
        middle_name: '',
        residence_country: 'India',
        gender: 'Female',
        email: 'tanya.chahuhan@stackroute.in',
        contact_phone_number_personal: '9880076500',
        residence_city: 'Bangalore',
        employment_status: 'Participation',
        department_name: 'Visiting',
        time_updated: '6 Aug 2020',
        images: 'src/My_Gallery.png',
      },
      {
        source_id: 101,
        username: 'Anjitha R',
        first_name: 'Anjitha',
        last_name: 'R',
        middle_name: '',
        residence_country: 'India',
        gender: 'Female',
        email: 'anjitha.r@stackroute.in',
        contact_phone_number_personal: '9880076501',
        residence_city: 'Chennai',
        employment_status: 'Achievement',
        department_name: 'Feeding Birds',
        time_updated: '7 Aug 2020',
        images: 'src/My_Gallery.png',
      },

      {
        source_id: 102,
        username: 'Uma P',
        first_name: 'Uma',
        last_name: 'P',
        middle_name: '',
        residence_country: 'India',
        gender: 'Female',
        email: 'uma.p@stackroute.in',
        contact_phone_number_personal: '9880076503',
        residence_city: 'Bangalore',
        employment_status: 'Achievement',
        department_name: 'Watching Birds',
        time_updated: '7 Aug 2020',
        images: 'src/My_Gallery.png',
      },
      {
        source_id: 103,
        username: 'Rishabh S',
        first_name: 'Rishabh',
        last_name: 'Srivastava',
        middle_name: '',
        residence_country: 'India',
        gender: 'Male',
        email: 'rishabh.srivastava@stackroute.in',
        contact_phone_number_personal: '9880076505',
        residence_city: 'Chennai',
        employment_status: 'Participation',
        department_name: 'Feeding Birds',
        time_updated: '7 Aug 2020',
        images: 'src/My_Gallery.png',
      },

      {
        source_id: 104,
        username: 'Rohit Ghosh',
        first_name: 'Rohit',
        last_name: 'Ghosh',
        middle_name: '',
        residence_country: 'India',
        gender: 'Male',
        email: 'rohit.ghosh@stackroute.in',
        contact_phone_number_personal: '9860076505',
        residence_city: 'Kolkata',
        employment_status: 'Participation',
        department_name: 'Feeding Birds',
        time_updated: '9 Aug 2020',
        images: 'src/My_Gallery.png',
      },
      {
        source_id: 105,
        username: 'Vijay Sharma',
        first_name: 'Vijay',
        last_name: 'Sharma',
        middle_name: '',
        residence_country: 'India',
        gender: 'Male',
        email: 'vijay.sharma@stackroute.in',
        contact_phone_number_personal: '9860076505',
        residence_city: 'Kolkata',
        employment_status: 'Participation',
        department_name: 'Feeding Birds',
        time_updated: '8 Aug 2020',
        images: 'src/My_Gallery.png',
      },

    ],
  }

  // get API
  getUsersDetails(_hitapi: boolean = false): Observable<any> {
    // if (hitapi) {
    //   // get the data from the api and handle errors appropriately
    //   return this.http.get(GETURL).pipe(
    //     tap(res => console.log('recieved data as ', res)),
    //     catchError(_ => of(null))
    //   )
    // }
    const result = this.userData
    // this.parseEmployeeResults(result)
    return of(result)
  }

  getUserFromID(userID: number, _hitapi: boolean = false): Observable<IRegsiterDetailObject | any> {
    // if (hitapi) {
    //   const request$ = this.http.get(GET_ID_URL)
    //   const response$ = request$.pipe(
    //     tap(res => console.log('recieved response for get by id is ', res)),
    //     catchError(_ => of(null))
    //   )
    //   return response$
    // }
    const result = this.userData.details.find(userObj => userObj.source_id === userID)
    if (result) {
      return of(result)
    }
    return of(null)
  }

}
