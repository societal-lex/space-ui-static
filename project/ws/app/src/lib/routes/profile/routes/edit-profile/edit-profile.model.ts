export namespace NsEditProfile {
  export interface IResponseBody {
    wid: string ,
    userFirstName: string,
    userLastName: string,
    sourceProfilePicture: string,
    userproperties: IUserProperties,
  }
  export interface IUserProperties {
    bio: string,
    profileLink: string
  }
}
