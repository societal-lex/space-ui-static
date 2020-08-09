export interface RegsiterDetailObject {
  source_id?: number,
  username?: string,
  first_name?: string,
  last_name?: string,
  middle_name?: string,
  residence_country?: string,
  gender?: string,
  email?: string,
  contact_phone_number_personal?: string,
  residence_city?: string,
  employment_status?: string,
  department_name?: string,
}
export interface RegisterUserModel {
  details: RegsiterDetailObject[]
}