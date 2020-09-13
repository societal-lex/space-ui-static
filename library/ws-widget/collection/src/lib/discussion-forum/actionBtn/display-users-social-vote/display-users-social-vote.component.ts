import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'ws-widget-display-users-social-vote',
  templateUrl: './display-users-social-vote.component.html',
  styleUrls: ['./display-users-social-vote.component.scss'],
})
export class DisplayUsersSocialVoteComponent implements OnInit {

  @Input()
  userList: any[] = []
  @Input()
  userListDownVote: any[] = []
  @Input()
  voteType: any
  @Input()
  userLike: any[] = []

  @Input()
  iconType: any
  @Input()
  userDetailsForDownVote: any

  // getWidsForLike: string[] = []
  // getWidsForUpvote: string[] = []
  // getWidsForDownvote: string[] = []
  userListForUpvote: any
  constructor() { }

  ngOnInit() {
    // console.log("userlist", this.userList)
    // if(this.userList){
    //   this.getWidsForUpvote = this.userList.
    // }

  }

}
