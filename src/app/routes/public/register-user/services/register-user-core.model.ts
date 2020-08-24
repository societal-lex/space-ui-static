export interface IRegsiterDetailObject {
  visible?: boolean,
  source_id?: string,
  username?: string,
  first_name?: string,
  last_name?: string,
  middle_name?: string,
  residence_country?: string,
  gender?: string,
  email?: string,
  contact_phone_number_personal?: string,
  residence_city?: string,
  employmentStatus?: string,
  department_name?: string,
  time_updated?: string,
  images?: string,
  profile_image?: string,
  rating?: number
  about?: string
  language?: string
  commentdata?: string
}
export interface IRegisterUserModel {
  details: IRegsiterDetailObject[]
}
