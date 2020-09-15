export namespace NsEditProfile {
  export interface IResponseBody {
    wid: string,
    userFirstName: string,
    userLastName: string,
    sourceProfilePicture: string,
    userProperties: IUserProperties,
  }
  export interface IUserProperties {
    bio: string,
    profileLink: string,
    API_END_POINT?: string,
    edit_profile?: IEditProfile,
    org?: string,
    root_org?: string,
  }
  export interface IEditProfile {
    type: string,
    url: string,
    errorMessage: string,
    successMessage: string
  }
}
