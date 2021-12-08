import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../fragments/sidebar/sidebar.component';
import { BuscaSelectComponent } from '../fragments/busca-select/busca-select.component';
import { ModalComponent } from '../fragments/modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { DropDownDivComponent } from '../fragments/drop-down-div/drop-down-div.component';
import { NgxMaskModule } from 'ngx-mask';
import { InterceptorModule } from '../Interceptor/interceptor.module';



@NgModule({
  declarations: [
    SidebarComponent,
    BuscaSelectComponent,
    ModalComponent,
    DropDownDivComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatOptionModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    InterceptorModule
  ],
  providers:[
    HttpClient
  ],
  exports:[
    SidebarComponent,
    BuscaSelectComponent,
    ModalComponent,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatTableModule,
    DropDownDivComponent,
    NgxMaskModule,
    FormsModule
  ]
})
export class AppCommomsModuleModule { }
