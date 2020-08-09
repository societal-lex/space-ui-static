import { Injectable } from '@angular/core'
// import { HttpClient } from '@angular/common/http'
import { RegisterUserModel, RegsiterDetailObject } from './register-user-core.model'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RegisterUserCoreService {

  constructor() { }

  userData: RegisterUserModel = {
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
        employment_status: 'Participatry',
        department_name: 'Visiting',
        time_updated: '7 Aug 2020',

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
        residence_city: 'Bangalore',
        employment_status: 'Achievement',
        department_name: 'Feeding Birds',
        time_updated: '7 Aug 2020',
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
      },
      {
        source_id: 103,
        username: 'Rishabh Srivastava',
        first_name: 'Rishabh',
        last_name: 'Srivastava',
        middle_name: '',
        residence_country: 'India',
        gender: 'Male',
        email: 'rishabh.srivastava@stackroute.in',
        contact_phone_number_personal: '9880076505',
        residence_city: 'Bangalore',
        employment_status: 'Participatry',
        department_name: 'Feeding Birds',
        time_updated: '7 Aug 2020',
      },

    ],
  }

  // get API
  getUsersDetails(): Observable<any> {
    const result = this.userData
    return of(result)
  }

  getUserFromID(userID: number): Observable<RegsiterDetailObject | any> {
    const result = this.userData.details.find(userObj => userObj.source_id === userID)
    if (result) {
      return of(result)
    }
    return of(null)
  }
}
