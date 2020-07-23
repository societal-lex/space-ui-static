export namespace NsUserDashboard {
  export interface IUserDashboard {
    username: string,
    firstname: string,
    lastname: string,
    user_id: string,
    emailId: string,
    roles: string[],
    root_org: string,
    organisation: string
  }
  export interface IUserData {
    API_END_POINT: string,
    user_list: IUserList,
    user_accept: IUserAccept,
    dailog_data: IDailogData,
    defaultRoles: IRoles,
    change_roles: IUpdateRoles,
    getAllRoles: IGetAllRoles,
    delete_user: IDeleteUser,
    root_org: string,
    org: string,
    userDetails: IUserDetails,
    API_FOR_USER_DETAILS?: string
    upload_file: IUploadFileFromConfig,
    createUser: ICreateUser,
  }
  export interface IUserList {
    type: string,
    url: string,
    errorMessage: string,
  }
  export interface IUserAccept {
    type: string,
    url: string,
    errorMessage: string,
    successMessage: string
  }
  export interface IUpdateRoles {
    type: string,
    url: string,
    errorMessage: string,
    successMessage: string,
  }
  export interface IDeleteUser {
    type: string,
    url: string,
    errorMessage: string,
    successMessage: string
  }
  export interface IUserListData {
    disableableCredentialTypes: string[],
    totp: Boolean,
    emailVerified: Boolean,
    firstName: string,
    lastName: string,
    requiredActions: string[]
    access: IAccess,
    createdTimestamp: number,
    id: String,
    enabled: Boolean,
    email: string,
    username: string,
  }
  export interface IAccess {
    manageGroupMembership: Boolean,
    view: Boolean,
    mapRoles: Boolean,
    impersonate: Boolean,
    manage: Boolean
  }
  export interface IGetAllRoles {
    type: string,
    url: string,
    errorMessage: string,
    successMessage: string
  }
  export interface IGetUserData {
    displayName: string,
    id: string,
    mail: string,
    roles: string[],
  }
  export interface IDailogData {
    title: string,
    body: string,
    userName: string
  }
  export interface IDeclineUser {
    email: string
    user_Id: string
  }
  export interface IRoles {
    roles: string[]
  }
  export interface IChangeRole {
    wid: String,
    roles: string[],
    email: string,
    name: string,
  }
  export interface IAcceptRole {
    roles: string[],
    user_id: string,
    username: string
  }
  export interface IHeaders {
    rootOrg: string,
    org: string,
    wid_OrgAdmin: string
  }
  export interface ISpecificUserRoles {
    user_id: string,
  }
  export interface IUserDetails {
    url: string
  }
  export interface IUserDataForFileUpload {
    headers: IHeader,
    data: IHeader[]
  }
  export interface IHeader {
    firstName: string,
    lastName: string,
    email: string,
    organisation: string,
  }
  export interface IUploadFileFromConfig {
    validFileExtension: string[],
    successMessageForFileUpload: string,
    successMessageForBulkCreation: string,
    errorMessageForFileUpload: string,
    errorMessageForBulkCreation: string,
    templateHeading: string,
    templateBody: string,
    fileSize: number,
    errorMessageForInvalidFileFormat: string,
    errorMessageForFileSize: string,
    errorMesageForFileReader: string
  }
  export interface ICreateUser {
    successMessage: string,
    errorMessage: string,
    url: string
  }
}
