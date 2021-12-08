import { Directive, ElementRef, HostListener, Injector, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MyErrorStateMatcher } from "src/app/shared/classes/my-error-state-matcher";
import { ModalComponent } from "src/app/shared/fragments/modal/modal.component";
import { AuthenticationService } from "src/app/shared/service/authentication-service.service";
import { BasicHttpServiceService } from "src/app/shared/service/basic-http-service.service";
import * as XLSX from 'xlsx';
import { BaseResourceService } from "../service/BaseResourceService.service";
import * as FileSaver from 'file-saver';
import { environment } from "src/environments/environment";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export interface XlsError {
  linha: number;
  erro: string;
}
@Directive()
export abstract class BaseResourceComponent<T> implements OnInit {

  protected toastr: ToastrService;
  protected auth: AuthenticationService;
  protected fb: FormBuilder;
  protected router: Router;
  protected route: ActivatedRoute
  protected resources: any;
  protected http: BasicHttpServiceService
  public form!: FormGroup;
  dataSource = new MatTableDataSource()
  public matcher = new MyErrorStateMatcher()

  apiUrl = environment.apiUrl

  xlsResult: any;
  xlsErrors: Array<XlsError> = [];
  @ViewChild('modalImportacao') modalImp!: ModalComponent;
  @ViewChild('xlsInput') inputFile!: ElementRef;
  @ViewChild('modalNew') modalNew!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;
  @ViewChild('modalXlsErrors') modalXlsErrors!: ModalComponent;
  deleteItem: any;

  constructor(protected injector: Injector, protected service: BaseResourceService<T>) {
    this.toastr = injector.get(ToastrService)
    this.auth = injector.get(AuthenticationService)
    this.fb = injector.get(FormBuilder)
    this.router = injector.get(Router)
    this.route = injector.get(ActivatedRoute)
    this.http = injector.get(BasicHttpServiceService)
  }

  ngOnInit(): void {
    this.loadResources()
  }

  public new() {
    this.form.reset();
    this.modalNew.open('md')
  }

  update(item: any) {
    this.form.patchValue(item)
    this.modalNew.open('md')
  }

  public delete() {
    this.service.delete(this.deleteItem.id).subscribe(
      data => {
        this.toastrSuccess('Feito')
        this.modalDelete.close()
        this.loadResources()
        console.log(data);
      },
      error => {
        this.failActions(error)
      }
    )
  }

  public sendListResource() {
    this.service.post([this.form.value]).subscribe(
      data => {
        console.log(data);
        this.toastrSuccess('Feito!')
        this.modalNew.close()
        this.loadResources()
        this.form.reset()
      },
      error => {
        this.failActions(error)
      }
    )
  }
  public sendResource() {
    console.log(this.form.value);
    this.submit(this.form.value)
  }
  public submit(obj: any) {
    if (obj.id == null) {

      this.service.post(obj).subscribe(
        data => {
          console.log(data);
          this.toastrSuccess('Feito!')
          this.modalNew.close()
          this.loadResources()
          this.form.reset()
        },
        error => {
          this.failActions(error)
        }
      )
    } else {
      this.service.patch(obj).subscribe(
        data => {
          console.log(data);
          this.toastrSuccess('Feito!')
          this.modalNew.close()
          this.loadResources()
          this.form.reset()
        },
        error => {
          this.failActions(error)
        }
      )
    }
  }
  loadResources() {
    this.service.get().subscribe(

      data => {
        this.resources = data;
        this.dataSource.data = data;
        console.log(data);
      },
      error => {
        this.failActions(error)
      }
    )
  }

  compareFn(obj1: any, obj2: any): boolean {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }

  protected toastrSuccess(msg: string) {
    this.toastr.success(msg, '', { positionClass: 'toast-top-center' })
  }

  hasAuthority(profile: any) {
    return this.auth.hasAuthority(profile)
  }

  readXLS(event: any, jsonConvertFN: (data: any) => any, validationFn: (data: any) => any) {
    let file: File = event.target.files[0];
    let fileReader = new FileReader();
    validationFn.bind(this)
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async (e) => {
      var arrayBuffer: any = fileReader.result;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; i++) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var result = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);
      this.xlsResult = jsonConvertFN(result)
      this.xlsErrors = validationFn(result)
      this.inputFile.nativeElement.value = ""

      if (this.xlsErrors.length == 0) {
        this.modalImp.open('md')
      }

      if (this.xlsErrors.length > 0) {
        this.modalXlsErrors.open('md')
      }
      console.log(this.xlsErrors);

      console.log(this.xlsResult);
    }

  }

  width = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = window.innerWidth;
  }

  failActions(error: any) {
    if (error.status === 500) {
      this.toastr.error(error.error.message, '', { positionClass: 'toast-top-center' })
      console.log(error.error);
    }
    if (error.status === 0) {
      this.toastr.error('Falha na conexão', '', { positionClass: 'toast-top-center' })
    } else if (error.status != 401) {
      console.log(error.error.errorsObjects);
      this.toastr.error('Falha na operação', '', { positionClass: 'toast-top-center' })
    }
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const header = Object.keys(json[0]);

    var wscols = [];
    for (var i = 0; i < header.length; i++) {
      wscols.push({ width: 10, height: 20 })
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    worksheet["!cols"] = wscols;
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  downloadFile(url: string, fileName: string) {
    // this.http.get(url).subscribe(
    //   data => {
    //     const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    //     const url = window.URL.createObjectURL(blob);
    //     window.open(url);
    //   }
    // )
    this.http.downloadFile(url,fileName, 'blob')
  }


  // npm install ngx-toastr --save
  // npm install @angular/animations --save
  // ng add @angular/material
  // npm install xlsx
  // npm install file-saver
  // npm i --save-dev @types/xlsx
  // npm i --save-dev @types/file-saver
  // npm i @ng-bootstrap/ng-bootstrap
  // npm i moment
}
