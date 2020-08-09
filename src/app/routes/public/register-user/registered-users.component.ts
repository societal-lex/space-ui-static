import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RegsiterDetailObject } from './services/register-user-core.model'

@Component({
  selector: 'ws-registered-users',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisteredUsersComponent implements OnInit {

  @Input() searchTerm = ''
  confirmDelete = false
  registeredUsers: RegsiterDetailObject[] | undefined = undefined

  constructor(private _route: ActivatedRoute,
              private _router: Router
  ) { }

  ngOnInit() {
    this._route.data.subscribe((_users: any) => {
      this.registeredUsers = [..._users.users.details]
    })
  }

  redirectToUser($event: RegsiterDetailObject) {
    this._router.navigate(['/public/registeredusers/detail', $event.source_id])
  }

  // viewEmployee() {
  //   this._router.navigate(['/employees', this.employee.id], {
  //     queryParams: { 'searchTerm': this.searchTerm }
  //   })
  // }

}
