import { Component, OnInit} from '@angular/core'
import { NsUserDashboard } from '../../models/user-dashboard.model'
import { UserDashboardService } from '../../services/user-dashboard.service'
import { forkJoin } from 'rxjs'
import { MatSnackBar, MatDialog } from '@angular/material'
import { DisplayErrorComponent } from '../display-error/display-error.component'
import * as XLSX from 'xlsx'

type AOA = any[][]
@Component({
  selector: 'ws-app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {

  constructor(private userDashboardSvc: UserDashboardService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) { }
  // @Output()
  // closeDailog = new EventEmitter()

  records: any[] = []
  recordsForXlsx: any[] = []
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
    this.uploadFileData.sampleFile = this.userDashboardData.upload_file.sampleFile

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
      if (this.file.name.toLowerCase().endsWith('.csv')) {
        this.csvUploadFile(this.file)
      } else if (this.file.name.toLowerCase().endsWith('.xlsx')) {
        this.xslUploadFile(this.file)
      }
      // let input = $event.target

    }

  }

  csvUploadFile(file: File) {
    this.records = []
    const reader = new FileReader()
    reader.readAsText(file)

    reader.onload = () => {
      const csvData = reader.result
      const csvRecordsArray = (<string>csvData).split(/\r\n|\n/)

      const headersRow = this.getHeaderArray((<string>csvRecordsArray[0]).split(','))
      this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length)
      this.createBulkUsers(this.records)
    }

    reader.onerror = function () {
      return 'error'
    }
  }
  xslUploadFile(file: File) {
    this.recordsForXlsx = []
    const reader: FileReader = new FileReader()
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' })

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0]
      const ws: XLSX.WorkSheet = wb.Sheets[wsname]

      /* save data */
      // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }))
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
      const headerRow = this.getHeaderArray(data[0])
      this.recordsForXlsx = this.getDataFromXlsx(data, headerRow.length)
      this.createBulkUsers(this.recordsForXlsx)
    }
    reader.readAsBinaryString(file)
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
    this.recordsForXlsx = []
  }
  getDataFromXlsx(data: any, headerLength: any) {
    this.isLoad = true
    // tslint:disable-next-line: prefer-const
    let xlsxArr = []

    // tslint:disable-next-line: no-increment-decrement
    for (let i = 1; i < data.length; i++) {
      // tslint:disable-next-line: prefer-const
      let curruntRecord = data[i]
      if (curruntRecord.length === headerLength) {
        // tslint:disable-next-line: prefer-const
        let xlsxRecord: any = new Object()
        if (curruntRecord) {
          xlsxRecord.firstName = curruntRecord[0]
          xlsxRecord.lastName = curruntRecord[1]
          xlsxRecord.email = curruntRecord[2]
          xlsxRecord.organisation = curruntRecord[3]
          xlsxArr.push(xlsxRecord)
        }
      }
    }
    return xlsxArr

  }
  createBulkUsers(recordsArray: any[]) {

    if (recordsArray) {
      const responseData = recordsArray.map(eachRow => {
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
            // this.closeDailog.emit('true')
            this.openDailogToDisplayFailedUsers(email)
          } else {
            this.file = null
            // this.closeDailog.emit('true')
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
    //  const headers = (<string>csvRecordsArr[0]).split(',')
    const headers = csvRecordsArr
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
    this.recordsForXlsx = []
  }
  openDailogToDisplayFailedUsers(email: string[]) {
    this.dialog.open(DisplayErrorComponent, {
      width: '500px',
      data: email,
    })
  }

  downloadFile() {
    // tslint:disable-next-line: prefer-const
    let data = this.uploadFileData.sampleFile
    this.export(data, 'Sample.xlsx')
  }

  export(data: AOA, fileName: string): void {

    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data)

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'UserDetails')

    /* save to file */
    XLSX.writeFile(wb, fileName)
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
