import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-busca-select',
  templateUrl: './busca-select.component.html',
  styleUrls: ['./busca-select.component.css']
})
export class BuscaSelectComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input() objetos!: any[]

  public objectCtrl: FormControl = new FormControl();

  public objectFilterCtrl: FormControl = new FormControl();

  public objectBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  public filteredObjects: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  protected _onDestroy = new Subject<void>();

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  @Input() opcaoBusca: any;


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

  ngOnInit(): void {
    if(this.objetos){
      // set initial selection
    this.objectCtrl.setValue(this.objetos);

    // load the initial bank list
    this.filteredObjects.next(this.objetos.slice());
    }

    // listen for search field value changes
    this.objectFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterObjects();
      });
  }
  ngAfterViewInit(): void {
    // this.setInitialValue();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  protected filterObjects() {
    if (!this.objetos) {
      return;
    }
    // get the search keyword
    let search = this.objectFilterCtrl.value;
    if (!search) {
      this.filteredObjects.next(this.objetos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    if(this.opcaoBusca == 1){

      this.filteredObjects.next(
        this.objetos.filter(object => object.name.toLowerCase().indexOf(search) > -1)
      );
    }

    if(this.opcaoBusca == 2){
      this.filteredObjects.next(
        this.objetos.filter(object => object.description.toLowerCase().indexOf(search) > -1)
      );
    }
  }

  // protected setInitialValue() {
  //   this.filteredObjects
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
  //     });
  // }

}
