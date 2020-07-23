import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { NsUserDashboard } from '../../models/user-dashboard.model'
import { UserDashboardService } from '../../services/user-dashboard.service'
import { forkJoin } from 'rxjs'
import { MatSnackBar, MatDialog } from '@angular/material'
import { DisplayErrorComponent } from '../display-error/display-error.component'

@Component({
  selector: 'ws-app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {

  constructor(private userDashboardSvc: UserDashboardService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) { }
  @Output()
  closeDailog = new EventEmitter()
  records: any[] = []
  isDisplayInstruction = false
  fileUploadeData?: NsUserDashboard.IHeader
  validFileExtensions: string[] = []
  userDashboardData: NsUserDashboard.IUserData | any
  paramsForBulkUsers: NsUserDashboard.IHeader = {} as NsUserDashboard.IHeader
  userData: NsUserDashboard.IHeader[] = []
  isLoad = false
  successMessage = ''
  errorMessage = ''
  file!: File | null
  uploadFileData: NsUserDashboard.IUploadFileFromConfig = {} as NsUserDashboard.IUploadFileFromConfig

  ngOnInit() {
    this.userDashboardData = this.userDashboardSvc.getUserDashboardConfig()
    this.validFileExtensions = this.userDashboardData.upload_file.validFileExtensions
    this.successMessage = this.userDashboardData.upload_file.successMessageForBulkCreation
    this.errorMessage = this.userDashboardData.upload_file.errorMessageForBulkCreation
    this.uploadFileData.templateHeading = this.userDashboardData.upload_file.templateHeading
    this.uploadFileData.templateBody = this.userDashboardData.upload_file.templateBody
    this.uploadFileData.fileSize = this.userDashboardData.upload_file.fileSize
    this.uploadFileData.errorMessageForInvalidFileFormat = this.userDashboardData.upload_file.errorMessageForInvalidFileFormat
    this.uploadFileData.errorMessageForFileSize = this.userDashboardData.upload_file.errorMessageForFileSize
    this.uploadFileData.errorMessageForFileUpload = this.userDashboardData.upload_file.errorMessageForFileUpload
    this.uploadFileData.errorMesageForFileReader = this.userDashboardData.upload_file.errorMesageForFileReader
    this.uploadFileData.successMessageForFileUpload = this.userDashboardData.upload_file.successMessageForFileUpload

  }

  onDrop(file: any) {
    // let text = []
    // let files = $event.srcElement.files

    if (this.isValidFile(file) && this.isValidFileSize(file)) {
      this.assignFileValues(file)
    } else {
      this.fileReset()
    }
  }
  triggerUpload() {
    if (!this.file) {
      this.snackBar.open(this.uploadFileData.errorMessageForFileUpload, '', {
        duration: 2000,
      })
    } else {
      this.snackBar.open(this.uploadFileData.successMessageForFileUpload, '', {
        duration: 2000,
      })

      // let input = $event.target
      const reader = new FileReader()
      reader.readAsText(this.file)

      reader.onload = () => {
        const csvData = reader.result
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/)

        const headersRow = this.getHeaderArray(csvRecordsArray)
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length)
        this.createBulkUsers()
      }

      reader.onerror = function () {
        return 'error'
      }
    }

  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    this.isLoad = true
    // tslint:disable-next-line: prefer-const
    let csvArr = []

    // tslint:disable-next-line: no-increment-decrement
    for (let i = 1; i < csvRecordsArray.length; i++) {
      // tslint:disable-next-line: prefer-const
      let curruntRecord = (<string>csvRecordsArray[i]).split(',')
      if (curruntRecord.length === headerLength) {
        // tslint:disable-next-line: prefer-const
        let csvRecord: any = new Object()
        if (curruntRecord) {
          // csvRecord.id = curruntRecord[0].trim()
          csvRecord.firstName = curruntRecord[0].trim()
          csvRecord.lastName = curruntRecord[1].trim()
          csvRecord.email = curruntRecord[2].trim()
          csvRecord.organisation = curruntRecord[3].trim()
          // csvRecord.mobile = curruntRecord[5].trim()
          csvArr.push(csvRecord)
        }
      }
    }
    return csvArr
  }
  isEnabled() {
    if (this.file) {
      return true
    }
    return false
  }
  clearUploadedFile() {
    this.file = null
    this.records = []
  }
  // getDataRecordsArrayFromCSVFiles(csvRecordsArray: any, headerRow: any) {

  //   // tslint:disable-next-line: prefer-const
  //   let csvRecord: NsUserDashboard.IHeader = {} as NsUserDashboard.IHeader

  //   // tslint:disable-next-line: no-increment-decrement
  //   for (let i = 1; i < csvRecordsArray.length; i++) {
  //     // console.log("csvarray", csvRecordsArray)
  //     // tslint:disable-next-line: prefer-const
  //     let currentRecord = (<string>csvRecordsArray[i]).split(',')
  //     if (currentRecord.length === headerRow.length) {
  //       if (currentRecord) {
  //         csvRecord.firstName = currentRecord[0].trim()
  //         csvRecord.lastName = currentRecord[1].trim()
  //         csvRecord.email = currentRecord[2].trim()
  //         csvRecord.organisation = currentRecord[3].trim()
  //         console.log('currentrecors', csvRecord)
  //         this.userData.push(csvRecord)
  //         console.log("1 time", this.userData)
  //       }
  //     }
  //   }
  //   return this.userData
  // }
  createBulkUsers() {

    if (this.records) {
      const responseData = this.records.map(eachRow => {
        this.paramsForBulkUsers.firstName = eachRow.firstName
        this.paramsForBulkUsers.lastName = eachRow.lastName
        this.paramsForBulkUsers.email = eachRow.email
        this.paramsForBulkUsers.organisation = eachRow.organisation
        const responseForBulkCreateUsers = this.userDashboardSvc.createUserApi(this.paramsForBulkUsers)
        this.paramsForBulkUsers = {} as NsUserDashboard.IHeader
        return responseForBulkCreateUsers
      })
      forkJoin(responseData).subscribe(response => {
        this.isLoad = false
        const failedResponseEmail = response.filter(data => {
          if (!data.ok) {
            return data
          }
          return ''
        })
        if (failedResponseEmail.length > 0) {
        // tslint:disable-next-line: prefer-const
        // tslint:disable-next-line: one-variable-per-declaration
        // tslint:disable-next-line: prefer-const
        let email: string[] = []
        failedResponseEmail.forEach((data: any) => {
          if (data.error) {
            if (data.error.error.DATA) {
              email.push(data.error.error.DATA.Email)
            }
          }
        })
        if (email) {

          this.file = null
          this.closeDailog.emit('true')
          this.openDailogToDisplayFailedUsers(email)
        } else {
          this.file = null
          this.closeDailog.emit('true')
          // tslint:disable-next-line: prefer-template
          this.snackBar.open(this.errorMessage, '', {
            duration: 3000,
          })
        }
        } else {
          this.file = null
          this.snackBar.open(this.successMessage, '', {
            duration: 3000,
          })
        }
      })
    }
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (<string>csvRecordsArr[0]).split(',')
    const headerArray = []
    // tslint:disable-next-line: no-increment-decrement
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j])
    }
    return headerArray
  }

  isValidFile(file: any) {
    let result = false
    this.validFileExtensions.forEach(data => {
      if (file.name.toLowerCase().endsWith(data)) {
        result = true
      }
    })
    if (result === false) {
      this.snackBar.open(this.errorMessage, '', {
        duration: 3000,
      })
    }
    return result
  }
  isValidFileSize(file: any) {
    if (file.size <= this.uploadFileData.fileSize) {
      return true
    }
    this.snackBar.open(this.errorMessage, '', {
      duration: 3000,
    })
    return false
  }
  assignFileValues(file: any) {
    this.file = file
  }
  fileReset() {
    // this.csvReader.nativeElement.value = ""
    this.records = []
  }
  openDailogToDisplayFailedUsers(email: string[]) {
    this.dialog.open(DisplayErrorComponent, {
      width: '300px',
      data: email,
    })
  }

  // onDrop(file: any) {
  //   console.log("selcet", file)
  //   // tslint:disable-next-line: prefer-const
  // // const files = evt.target.files // FileList object
  // //   const file = files[0]
  //   const reader = new FileReader()
  //   reader.readAsText(file)
  //   reader.onload = (event: any) => {
  //     const csv = event.target.result // Content of CSV file
  //     const csvRecordsArray = (<string>csv).split(/\r\n|\n/)
  //     // let curruntRecord = (<string>csvRecordsArray[i]).split(',')
  //     // let csvArr = []

  //     // tslint:disable-next-line: no-increment-decrement
  //     for (let i = 1; i < csvRecordsArray.length; i++) {
  //       const curruntRecord = (<string>csvRecordsArray[i]).split(',')
  //       if (curruntRecord.length == headerLength) {
  //         let csvRecord: CSVRecord = new CSVRecord()
  //         csvRecord.id = curruntRecord[0].trim()
  //         csvRecord.firstName = curruntRecord[1].trim()
  //         csvRecord.lastName = curruntRecord[2].trim()
  //         csvRecord.age = curruntRecord[3].trim()
  //         csvRecord.position = curruntRecord[4].trim()
  //         csvRecord.mobile = curruntRecord[5].trim()
  //         csvArr.push(csvRecord)
  //       }
  //     }
  // parse(csv, {
  // skipEmptyLines: true,
  // header: true,
  // complete: (results: { data: string | any[] }) => {
  //   // tslint:disable-next-line: no-increment-decrement
  //   for (let i = 0; i < results.data.length; i++) {
  //     const orderDetails = {
  //       order_id: results.data[i].Address,
  //       age: results.data[i].Age
  //     }
  //     this.test.push(orderDetails)
  //   }
  //   // console.log(this.test);
  //   console.log('Parsed: k', results.data)
  // }
  // })
  // }
  // this.ConvertCSVtoJSON()

  // }
  // ConvertCSVtoJSON() {
  //   console.log(JSON.stringify(this.test))
  //   // let csvData = '"Hello","World!"';
  //   // this.papa.parse(csvData, {
  //   //   complete: (results) => {
  //   //     console.log('Parsed  : ', results.data[0][1]);
  //   //     // console.log(results.data.length);
  //   //   }
  //   // });
  // }

}
