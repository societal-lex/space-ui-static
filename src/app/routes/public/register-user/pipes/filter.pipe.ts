import { Pipe, PipeTransform } from '@angular/core'
import { RegsiterDetailObject } from '../services/register-user-core.model'
const { isArray } = Array

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  // transform(users: RegsiterDetailObject[], searchText: string): RegsiterDetailObject[] {

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
  transform(users: RegsiterDetailObject[], find: string): RegsiterDetailObject[] {

    // if(typeof find==='object'){
    //   this.handleObject(find)
    // }

    if (!users) { return [] }
    if (!find) { return users }
    find = find.toLowerCase()

    return search(users, find)
  }

}

function search(entries: any[], search: string) {

  search = search.toLowerCase()

  return entries.filter(function (obj) {
    const keys: string[] = Object.keys(obj)
    return keys.some(function (key) {
      const value = obj[key]
      if (isArray(value)) {
        return value.some(v => {
          return v.toString().toLowerCase().includes(search)
        })
      }
       if (!isArray(value)) {
        return value.toString().toLowerCase().includes(search)
      }
    })
  })
}
