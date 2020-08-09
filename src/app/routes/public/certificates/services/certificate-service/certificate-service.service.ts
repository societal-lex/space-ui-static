import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CertificateServiceService {
  data: any
  date: any
  constructor() {
    const currentDate = new Date()
    this.date = currentDate.toDateString()
    this.data = {
      123: {
        FullName: 'sanjay',
        course : 'computer science',
        point : '70%',
        Date: this.date,

      },
      234: {
        FullName: 'vijay',
        course : 'computer science',
        point : '70%',
        Date: this.date,

      },
      321: {
        FullName: 'Ankit',
        course : 'commerce',
        point : '50%',
        Date: this.date,

      },
      432: {
        FullName: 'Abhishek',
        course : 'Information Technology',
        point : '90%',
        Date: this.date,

      },
      543: {
        FullName: 'Arun',
        course : 'physics',
        point : '96%',
        Date: this.date,

      },
    }
   }

  getUser(wid: any): Observable<any> {
    return of(this.data[wid])
  }
}
