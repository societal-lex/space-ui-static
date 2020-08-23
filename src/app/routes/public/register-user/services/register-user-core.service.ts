import { Injectable } from '@angular/core'
import { IRegsiterDetailObject } from './register-user-core.model'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

// const GETURL = ''
// const GET_ID_URL = ''
@Injectable({
   providedIn: 'root',
})
export class RegisterUserCoreService {

   data: any
   constructor(private http: HttpClient) { }

   // userData: IRegisterUserModel =
   //  {

   // details: [
   // {

   // // source_id: '1234',
   // // visible: true,
   // // username: 'Sumit Nautiyal',
   // // first_name: 'Sumit',
   // // last_name: 'Nautiyal',
   // // middle_name: '',
   // // residence_country: 'India',
   // // gender: 'Male',
   // // email: 'sumit.nautiyal@ilimi.in',
   // // contact_phone_number_personal: '8908765671',
   // // residence_city: 'Delhi',
   // // employment_status: 'Achievement',
   // // department_name: 'Bird Watching',
   // // time_updated: '7 Aug 2020',
   // // },
   // // {
   // // visible: false,
   // // source_id: '100',
   // // username: 'Tanya Chauhan',
   // // first_name: 'Tanya',
   // // last_name: 'Chauhan',
   // // middle_name: '',
   // // residence_country: 'India',
   // // gender: 'Female',
   // // email: 'tanya.chahuhan@stackroute.in',
   // // contact_phone_number_personal: '9880076500',
   // // residence_city: 'Bangalore',
   // // employment_status: 'Participatry',
   // // department_name: 'Visiting',
   // // time_updated: '7 Aug 2020',
   // // },
   // // {
   // // visible: false,
   // // source_id: '101',
   // // username: 'Anjitha R',
   // // first_name: 'Anjitha',
   // // last_name: 'R',
   // // middle_name: '',
   // // residence_country: 'India',
   // // gender: 'Female',
   // // email: 'anjitha.r@stackroute.in',
   // // contact_phone_number_personal: '9880076501',
   // // residence_city: 'Bangalore',
   // // employment_status: 'Achievement',
   // // department_name: 'Feeding Birds',
   // // time_updated: '7 Aug 2020',
   // // },

   // // {
   // // visible: true,
   // // source_id: '102',
   // // username: 'Uma P',
   // // first_name: 'Uma',
   // // last_name: 'P',
   // // middle_name: '',
   // // residence_country: 'India',
   // // gender: 'Female',
   // // email: 'uma.p@stackroute.in',
   // // contact_phone_number_personal: '9880076503',
   // // residence_city: 'Bangalore',
   // // employment_status: 'Achievement',
   // // department_name: 'Watching Birds',
   // // time_updated: '7 Aug 2020',
   // // },
   // // {
   // // visible: true,
   // // source_id: '103',
   // // username: 'Rishabh Srivastava',
   // // first_name: 'Rishabh',
   // // last_name: 'Srivastava',
   // // middle_name: '',
   // // residence_country: 'India',
   // // gender: 'Male',
   // // email: 'rishabh.srivastava@stackroute.in',
   // // contact_phone_number_personal: '9880076505',
   // // residence_city: 'Bangalore',
   // // employment_status: 'Participatry',
   // // department_name: 'Feeding Birds',
   // // time_updated: '7 Aug 2020',
   // // },
   // // {
   // // visible: false,
   // // source_id: 'acbf4053-c126-4e85-a0bf-252a896535ea',
   // // username: 'Deepak kumar',
   // // first_name: 'Deepak',
   // // last_name: 'Kumar',
   // // middle_name: '',
   // // residence_country: 'India',
   // // gender: 'Male',
   // // email: 'deepak.kumar@NIIT.in',
   // // contact_phone_number_personal: '8908765671',
   // // residence_city: 'Delhi',
   // // employment_status: 'Achievement',
   // // department_name: 'Bird Watching',
   // // time_updated: '7 Aug 2020',
   // },

   // ],

   // }

   // get API
   getUsersDetails(): Observable<any> {
      return this.http.get('/users/users')
   }

   getUserFromID(userID: string): Observable<IRegsiterDetailObject | any> {
      return this.http.get(`/users/users/${userID}`)
   }
   updateVisibility(userId: string, employment_status: string): Observable<IRegsiterDetailObject | any> {
      return this.http.put(`/users/users`, {
         id: userId, properties: {
            visible: true,
            employment_status,
         },
      },                   {
         headers: {
            'Content-Type': 'application/json',
         },
      })
   }

   updateRating(userID: string, rating: number) {
      return this.http.put(`/users/users`, {
         id: userID,
         properties: {
            rating,
         },
      })
   }

   updateComments(userID: string, comments: string[]) {
      return this.http.put(`/users/users`, {
         id: userID,
         properties: {
            comments,
         },
      })
   }

   //   Visibility(visible: true): Observable<IRegsiterDetailObject | any >
   // {
   // const result = this.userData.details.find(userObj => userObj.visible != visible)
   // if(result)
   // {
   // return of(result);
   // }
   // return of(false);
   // }

}
