import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()title!: string;

  @ViewChild('content') content!: TemplateRef<any>;

  modalOption: NgbModalOptions = {};

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(tamanho: string, superLarge?: boolean){
    this.modalOption.keyboard = false;
    if(!superLarge) this.modalOption.size = tamanho
    if(superLarge) this.modalOption.windowClass = 'myCustomModalClass'
    this.modalService.open(this.content, this.modalOption);
  }

  close(){
    this.modalService.dismissAll()
  }

}
