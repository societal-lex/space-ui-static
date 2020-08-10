import { Pipe, PipeTransform } from '@angular/core'
import { IRegsiterDetailObject } from '../services/register-user-core.model'
const { isArray } = Array

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  // transform(users: IRegsiterDetailObject[], searchText: string): IRegsiterDetailObject[] {

  //   if (!users || !searchText) {
  //     return users
  //   }
  //   console.log("------------", users.filter(user => user.residence_city.toLowerCase().indexOf(searchText.toLowerCase())! == -1)
  //   )
  //   return users.filter(user => user.residence_city.toLowerCase().indexOf(searchText.toLowerCase())! == -1)

  // }

  //   handleObject(find:any){
  // let status=find.status
  // let location=find.location

  // this.transform()
  //   }
  transform(users: IRegsiterDetailObject[], find: string): IRegsiterDetailObject[] {

    // if(typeof find==='object'){
    //   this.handleObject(find)
    // }

    if (!users) { return [] }
    if (!find) { return users }
    const finding = find.toLowerCase()

    return searching(users, finding)
  }

}

// function searching(entries: any[], search: string) {

//   search = search.toLowerCase()

//   return entries.filter(function (obj) {
//     const keys: string[] = Object.keys(obj)
//     return keys.some(function (key) {
//       const value = obj[key]
//       if (isArray(value)) {
//         return value.some(v => {
//           return v.toString().toLowerCase().includes(search)
//         })
//       }
//       if (!isArray(value)) {
//         return value.toString().toLowerCase().includes(search)
//       }
//     })
//   })
// }

function searching(entries: any[], search: string) {

  const searchs = search.toLowerCase()

  return entries.filter(obj => {
    const keys: string[] = Object.keys(obj)
    return keys.some(key => {
      const value = obj[key]
      if (isArray(value)) {
        return value.some(v => {
          return v.toString().toLowerCase().includes(searchs)
        })
      }
      if (!isArray(value)) {
        return value.toString().toLowerCase().includes(searchs)
      }
    })
  })
}
