import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  exibir: boolean = false;
  @Input() fixed: boolean = false;

  @Input() float: any;

  width = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = window.innerWidth;
  }

  constructor() { }

  ngOnInit(): void {
  }

  hide(){
    this.exibir = false;
  }

  change(){
    
    this.exibir = !this.exibir;
  }

  showSidebar(){
    
    this.exibir = true;
  }

  isFloat(float: string){
    return (this.float == float);
  }


}
